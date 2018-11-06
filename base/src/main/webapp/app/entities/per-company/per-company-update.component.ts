import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerCompany } from 'app/shared/model/per-company.model';
import { PerCompanyService } from './per-company.service';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';

@Component({
    selector: 'jhi-per-company-update',
    templateUrl: './per-company-update.component.html'
})
export class PerCompanyUpdateComponent implements OnInit {
    perCompany: IPerCompany;
    isSaving: boolean;

    defitems: IDefItem[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perCompanyService: PerCompanyService,
        private defItemService: DefItemService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perCompany }) => {
            this.perCompany = perCompany;
        });
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perCompany.id !== undefined) {
            this.subscribeToSaveResponse(this.perCompanyService.update(this.perCompany));
        } else {
            this.subscribeToSaveResponse(this.perCompanyService.create(this.perCompany));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerCompany>>) {
        result.subscribe((res: HttpResponse<IPerCompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }
}
