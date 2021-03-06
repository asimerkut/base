import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from './fiscal-period.service';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { FiscalYearService } from 'app/entities/fiscal-year';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-fiscal-period-update',
    templateUrl: './fiscal-period-update.component.html'
})
export class FiscalPeriodUpdateComponent implements OnInit {
    fiscalPeriod: IFiscalPeriod;
    isSaving: boolean;

    fiscalyears: IFiscalYear[];

    //  defitems: IDefItem[];

    donemItemList: IDefItem[];

    dateStartDp: any;
    dateFinishDp: any;

    constructor(
        public defItemService: DefItemService,
        private jhiAlertService: JhiAlertService,
        private fiscalPeriodService: FiscalPeriodService,
        private fiscalYearService: FiscalYearService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fiscalPeriod }) => {
            this.fiscalPeriod = fiscalPeriod;
        });
        this.fiscalYearService.query().subscribe(
            (res: HttpResponse<IFiscalYear[]>) => {
                this.fiscalyears = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        /*
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        */

        this.commonService.findAllByTypeId(EnmType.DONEM).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.donemItemList = res.body;
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

    trackFiscalYearById(index: number, item: IFiscalYear) {
        return item.id;
    }

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }
}
