import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDefRelation } from 'app/shared/model/def-relation.model';
import { DefRelationService } from './def-relation.service';
import { IDefType } from 'app/shared/model/def-type.model';
import { DefTypeService } from 'app/entities/def-type';

@Component({
    selector: 'jhi-def-relation-update',
    templateUrl: './def-relation-update.component.html'
})
export class DefRelationUpdateComponent implements OnInit {
    defRelation: IDefRelation;
    isSaving: boolean;

    deftypes: IDefType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private defRelationService: DefRelationService,
        private defTypeService: DefTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defRelation }) => {
            this.defRelation = defRelation;
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
        if (this.defRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.defRelationService.update(this.defRelation));
        } else {
            this.subscribeToSaveResponse(this.defRelationService.create(this.defRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefRelation>>) {
        result.subscribe((res: HttpResponse<IDefRelation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDefTypeById(index: number, item: IDefType) {
        return item.id;
    }
}
