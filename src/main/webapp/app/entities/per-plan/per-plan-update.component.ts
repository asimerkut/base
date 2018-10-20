import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPerPlan } from 'app/shared/model/per-plan.model';
import { PerPlanService } from './per-plan.service';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-per-plan-update',
    templateUrl: './per-plan-update.component.html'
})
export class PerPlanUpdateComponent implements OnInit {
    perPlan: IPerPlan;
    isSaving: boolean;

    perpeople: IPerPerson[];

    dersItemList: IDefItem[];
    //defitems: IDefItem[];
    startDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private perPlanService: PerPlanService,
        private perPersonService: PerPersonService,
        private defItemService: DefItemService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perPlan }) => {
            this.perPlan = perPlan;
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
        if (this.perPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.perPlanService.update(this.perPlan));
        } else {
            this.subscribeToSaveResponse(this.perPlanService.create(this.perPlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerPlan>>) {
        result.subscribe((res: HttpResponse<IPerPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
