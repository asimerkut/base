import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';
import { FiscalDayoffService } from './fiscal-dayoff.service';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { FiscalYearService } from 'app/entities/fiscal-year';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-fiscal-dayoff-update',
    templateUrl: './fiscal-dayoff-update.component.html'
})
export class FiscalDayoffUpdateComponent implements OnInit {
    fiscalDayoff: IFiscalDayoff;
    isSaving: boolean;

    fiscalyears: IFiscalYear[];

    // defitems: IDefItem[];
    tatilItemList: IDefItem[];

    dateStartDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private fiscalDayoffService: FiscalDayoffService,
        private fiscalYearService: FiscalYearService,
        private defItemService: DefItemService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fiscalDayoff }) => {
            this.fiscalDayoff = fiscalDayoff;
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
        this.commonService.findAllByTypeId(EnmType.TATIL).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.tatilItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fiscalDayoff.id !== undefined) {
            this.subscribeToSaveResponse(this.fiscalDayoffService.update(this.fiscalDayoff));
        } else {
            this.subscribeToSaveResponse(this.fiscalDayoffService.create(this.fiscalDayoff));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFiscalDayoff>>) {
        result.subscribe((res: HttpResponse<IFiscalDayoff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
