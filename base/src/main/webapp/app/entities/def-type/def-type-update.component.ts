import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDefType } from 'app/shared/model/def-type.model';
import { DefTypeService } from './def-type.service';

@Component({
    selector: 'jhi-def-type-update',
    templateUrl: './def-type-update.component.html'
})
export class DefTypeUpdateComponent implements OnInit {
    defType: IDefType;
    isSaving: boolean;

    constructor(private defTypeService: DefTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defType }) => {
            this.defType = defType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defType.id !== undefined) {
            this.subscribeToSaveResponse(this.defTypeService.update(this.defType));
        } else {
            this.subscribeToSaveResponse(this.defTypeService.create(this.defType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefType>>) {
        result.subscribe((res: HttpResponse<IDefType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
