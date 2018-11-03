import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPerExcuse } from 'app/shared/model/per-excuse.model';
import { PerExcuseService } from './per-excuse.service';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { IPerPeriodState } from 'app/shared/model/per-period-state.model';
import { PerPeriodStateService } from 'app/entities/per-period-state';
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-per-excuse-update',
    templateUrl: './per-excuse-update.component.html'
})
export class PerExcuseUpdateComponent implements OnInit {
    perExcuse: IPerExcuse;
    isSaving: boolean;

    perpeople: IPerPerson[];

    defitems: IDefItem[];
    izinItemList: IDefItem[];


    perperiodstates: IPerPeriodState[];
    startDateDp: any;
    finishDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private perExcuseService: PerExcuseService,
        private perPersonService: PerPersonService,
        private defItemService: DefItemService,
        private perPeriodStateService: PerPeriodStateService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perExcuse }) => {
            this.perExcuse = perExcuse;
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
        this.perPeriodStateService.query().subscribe(
            (res: HttpResponse<IPerPeriodState[]>) => {
                this.perperiodstates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.IZIN).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.izinItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perExcuse.id !== undefined) {
            this.subscribeToSaveResponse(this.perExcuseService.update(this.perExcuse));
        } else {
            this.subscribeToSaveResponse(this.perExcuseService.create(this.perExcuse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerExcuse>>) {
        result.subscribe((res: HttpResponse<IPerExcuse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerPeriodStateById(index: number, item: IPerPeriodState) {
        return item.id;
    }
}
