import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from './fiscal-period.service';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { FiscalYearService } from 'app/entities/fiscal-year';

@Component({
    selector: 'jhi-fiscal-period-update',
    templateUrl: './fiscal-period-update.component.html'
})
export class FiscalPeriodUpdateComponent implements OnInit {
    fiscalPeriod: IFiscalPeriod;
    isSaving: boolean;

    perpeople: IPerPerson[];

    fiscalyears: IFiscalYear[];
    dateStartDp: any;
    dateFinishDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private fiscalPeriodService: FiscalPeriodService,
        private perPersonService: PerPersonService,
        private fiscalYearService: FiscalYearService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fiscalPeriod }) => {
            this.fiscalPeriod = fiscalPeriod;
        });
        this.perPersonService.query().subscribe(
            (res: HttpResponse<IPerPerson[]>) => {
                this.perpeople = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fiscalYearService.query().subscribe(
            (res: HttpResponse<IFiscalYear[]>) => {
                this.fiscalyears = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fiscalPeriod.id !== undefined) {
            this.subscribeToSaveResponse(this.fiscalPeriodService.update(this.fiscalPeriod));
        } else {
            this.subscribeToSaveResponse(this.fiscalPeriodService.create(this.fiscalPeriod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalPeriod>>) {
        result.subscribe((res: HttpResponse<IFiscalPeriod>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerPersonById(index: number, item: IPerPerson) {
        return item.id;
    }

    trackFiscalYearById(index: number, item: IFiscalYear) {
        return item.id;
    }
}
