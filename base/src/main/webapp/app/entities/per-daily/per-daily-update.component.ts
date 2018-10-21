import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerDaily } from 'app/shared/model/per-daily.model';
import { PerDailyService } from './per-daily.service';
import { IPerCompany } from 'app/shared/model/per-company.model';
import { PerCompanyService } from 'app/entities/per-company';

@Component({
    selector: 'jhi-per-daily-update',
    templateUrl: './per-daily-update.component.html'
})
export class PerDailyUpdateComponent implements OnInit {
    perDaily: IPerDaily;
    isSaving: boolean;

    percompanies: IPerCompany[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perDailyService: PerDailyService,
        private perCompanyService: PerCompanyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perDaily }) => {
            this.perDaily = perDaily;
        });
        this.perCompanyService.query().subscribe(
            (res: HttpResponse<IPerCompany[]>) => {
                this.percompanies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perDaily.id !== undefined) {
            this.subscribeToSaveResponse(this.perDailyService.update(this.perDaily));
        } else {
            this.subscribeToSaveResponse(this.perDailyService.create(this.perDaily));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerDaily>>) {
        result.subscribe((res: HttpResponse<IPerDaily>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerCompanyById(index: number, item: IPerCompany) {
        return item.id;
    }
}
