import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerPeriodState } from 'app/shared/model/per-period-state.model';
import { PerPeriodStateService } from './per-period-state.service';
import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from 'app/entities/fiscal-period';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';

@Component({
    selector: 'jhi-per-period-state-update',
    templateUrl: './per-period-state-update.component.html'
})
export class PerPeriodStateUpdateComponent implements OnInit {
    perPeriodState: IPerPeriodState;
    isSaving: boolean;

    fiscalperiods: IFiscalPeriod[];

    perpeople: IPerPerson[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perPeriodStateService: PerPeriodStateService,
        private fiscalPeriodService: FiscalPeriodService,
        private perPersonService: PerPersonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perPeriodState }) => {
            this.perPeriodState = perPeriodState;
        });
        this.fiscalPeriodService.query().subscribe(
            (res: HttpResponse<IFiscalPeriod[]>) => {
                this.fiscalperiods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perPersonService.query().subscribe(
            (res: HttpResponse<IPerPerson[]>) => {
                this.perpeople = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perPeriodState.id !== undefined) {
            this.subscribeToSaveResponse(this.perPeriodStateService.update(this.perPeriodState));
        } else {
            this.subscribeToSaveResponse(this.perPeriodStateService.create(this.perPeriodState));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerPeriodState>>) {
        result.subscribe((res: HttpResponse<IPerPeriodState>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFiscalPeriodById(index: number, item: IFiscalPeriod) {
        return item.id;
    }

    trackPerPersonById(index: number, item: IPerPerson) {
        return item.id;
    }
}
