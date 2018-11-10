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
import { IPerPeriodState } from 'app/shared/model/per-period-state.model';
import { PerPeriodStateService } from 'app/entities/per-period-state';

@Component({
    selector: 'jhi-per-submit-update',
    templateUrl: './per-submit-update.component.html'
})
export class PerSubmitUpdateComponent implements OnInit {
    perSubmit: IPerSubmit;
    isSaving: boolean;

    perpeople: IPerPerson[];

    defitems: IDefItem[];

    perexcuses: IPerExcuse[];

    perperiodstates: IPerPeriodState[];
    submitDateDp: any;

    constructor(
        public defItemService: DefItemService,
        private jhiAlertService: JhiAlertService,
        private perSubmitService: PerSubmitService,
        private perPersonService: PerPersonService,
        private perExcuseService: PerExcuseService,
        private perPeriodStateService: PerPeriodStateService,
        private activatedRoute: ActivatedRoute
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
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perExcuseService.query().subscribe(
            (res: HttpResponse<IPerExcuse[]>) => {
                this.perexcuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perPeriodStateService.query().subscribe(
            (res: HttpResponse<IPerPeriodState[]>) => {
                this.perperiodstates = res.body;
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

    trackPerPeriodStateById(index: number, item: IPerPeriodState) {
        return item.id;
    }
}
