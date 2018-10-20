import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from './per-person.service';
import { IPerCompany } from 'app/shared/model/per-company.model';
import { PerCompanyService } from 'app/entities/per-company';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-per-person-update',
    templateUrl: './per-person-update.component.html'
})
export class PerPersonUpdateComponent implements OnInit {
    perPerson: IPerPerson;
    isSaving: boolean;

    percompanies: IPerCompany[];

    defitems: IDefItem[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perPersonService: PerPersonService,
        private perCompanyService: PerCompanyService,
        private defItemService: DefItemService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perPerson }) => {
            this.perPerson = perPerson;
        });
        this.perCompanyService.query().subscribe(
            (res: HttpResponse<IPerCompany[]>) => {
                this.percompanies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perPerson.id !== undefined) {
            this.subscribeToSaveResponse(this.perPersonService.update(this.perPerson));
        } else {
            this.subscribeToSaveResponse(this.perPersonService.create(this.perPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerPerson>>) {
        result.subscribe((res: HttpResponse<IPerPerson>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
