import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPerSubmit } from 'app/shared/model/per-submit.model';
import { PerSubmitService } from './per-submit.service';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { IPerExcuse } from 'app/shared/model/per-excuse.model';
import { PerExcuseService } from 'app/entities/per-excuse';
import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from 'app/entities/fiscal-period';
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-per-submit-update',
    templateUrl: './per-submit-update.component.html'
})
export class PerSubmitUpdateComponent implements OnInit {
    perSubmit: IPerSubmit;
    isSaving: boolean;

    perpeople: IPerPerson[];

    //defitems: IDefItem[];
    dersItemList: IDefItem[];

    perexcuses: IPerExcuse[];

    fiscalperiods: IFiscalPeriod[];
    submitDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private perSubmitService: PerSubmitService,
        private perPersonService: PerPersonService,
        private defItemService: DefItemService,
        private perExcuseService: PerExcuseService,
        private fiscalPeriodService: FiscalPeriodService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perSubmit }) => {
            this.perSubmit = perSubmit;
        });
        this.perPersonService.query().subscribe(
            (res: HttpResponse<IPerPerson[]>) => {
                this.perpeople = res.body;
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
        this.perExcuseService.query().subscribe(
            (res: HttpResponse<IPerExcuse[]>) => {
                this.perexcuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fiscalPeriodService.query().subscribe(
            (res: HttpResponse<IFiscalPeriod[]>) => {
                this.fiscalperiods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.commonService.findAllByTypeId(EnmType.DERS).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.dersItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perSubmit.id !== undefined) {
            this.subscribeToSaveResponse(this.perSubmitService.update(this.perSubmit));
        } else {
            this.subscribeToSaveResponse(this.perSubmitService.create(this.perSubmit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerSubmit>>) {
        result.subscribe((res: HttpResponse<IPerSubmit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }

    trackPerExcuseById(index: number, item: IPerExcuse) {
        return item.id;
    }

    trackFiscalPeriodById(index: number, item: IFiscalPeriod) {
        return item.id;
    }
}
