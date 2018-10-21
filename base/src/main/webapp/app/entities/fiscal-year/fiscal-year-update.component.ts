import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { FiscalYearService } from './fiscal-year.service';

@Component({
    selector: 'jhi-fiscal-year-update',
    templateUrl: './fiscal-year-update.component.html'
})
export class FiscalYearUpdateComponent implements OnInit {
    fiscalYear: IFiscalYear;
    isSaving: boolean;
    dateStartDp: any;
    dateFinishDp: any;

    constructor(private fiscalYearService: FiscalYearService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fiscalYear }) => {
            this.fiscalYear = fiscalYear;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fiscalYear.id !== undefined) {
            this.subscribeToSaveResponse(this.fiscalYearService.update(this.fiscalYear));
        } else {
            this.subscribeToSaveResponse(this.fiscalYearService.create(this.fiscalYear));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalYear>>) {
        result.subscribe((res: HttpResponse<IFiscalYear>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
