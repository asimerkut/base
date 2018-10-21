import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IDefPivot } from 'app/shared/model/def-pivot.model';
import { DefPivotService } from './def-pivot.service';

@Component({
    selector: 'jhi-def-pivot-update',
    templateUrl: './def-pivot-update.component.html'
})
export class DefPivotUpdateComponent implements OnInit {
    defPivot: IDefPivot;
    isSaving: boolean;

    constructor(private dataUtils: JhiDataUtils, private defPivotService: DefPivotService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defPivot }) => {
            this.defPivot = defPivot;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defPivot.id !== undefined) {
            this.subscribeToSaveResponse(this.defPivotService.update(this.defPivot));
        } else {
            this.subscribeToSaveResponse(this.defPivotService.create(this.defPivot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefPivot>>) {
        result.subscribe((res: HttpResponse<IDefPivot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
