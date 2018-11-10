import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDefField } from 'app/shared/model/def-field.model';
import { DefFieldService } from './def-field.service';

@Component({
    selector: 'jhi-def-field-update',
    templateUrl: './def-field-update.component.html'
})
export class DefFieldUpdateComponent implements OnInit {
    defField: IDefField;
    isSaving: boolean;

    constructor(private defFieldService: DefFieldService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defField }) => {
            this.defField = defField;
        });
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
}
