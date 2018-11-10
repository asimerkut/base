import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDefField } from 'app/shared/model/def-field.model';
import { DefFieldService } from './def-field.service';
import { IDefType } from 'app/shared/model/def-type.model';
import { DefTypeService } from 'app/entities/def-type';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-def-field-update',
    templateUrl: './def-field-update.component.html'
})
export class DefFieldUpdateComponent implements OnInit {
    defField: IDefField;
    isSaving: boolean;
    deftypes: IDefType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private defFieldService: DefFieldService,
        private defTypeService: DefTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defField }) => {
            this.defField = defField;
        });
        this.defTypeService.query().subscribe(
            (res: HttpResponse<IDefType[]>) => {
                this.deftypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defField.id !== undefined) {
            this.subscribeToSaveResponse(this.defFieldService.update(this.defField));
        } else {
            this.subscribeToSaveResponse(this.defFieldService.create(this.defField));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefField>>) {
        result.subscribe((res: HttpResponse<IDefField>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
