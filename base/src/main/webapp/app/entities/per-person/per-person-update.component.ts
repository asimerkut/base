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
import { CommonService } from 'app/entities/common';
import { EnmType } from 'app/shared/model/def-type.model';
import { IEnmEnum, EnmList } from 'app/shared/model/enm-enum.model';

@Component({
    selector: 'jhi-per-person-update',
    templateUrl: './per-person-update.component.html'
})
export class PerPersonUpdateComponent implements OnInit {
    perPerson: IPerPerson;
    isSaving: boolean;

    percompanies: IPerCompany[];

    // defitems: IDefItem[];
    hizmtItemList: IDefItem[];
    bransItemList: IDefItem[];
    unvanItemList: IDefItem[];
    kadroItemList: IDefItem[];
    karyrItemList: IDefItem[];
    konumItemList: IDefItem[];

    enmSozlesmeList: IEnmEnum[];
    enmMedeniList: IEnmEnum[];
    enmCinsList: IEnmEnum[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perPersonService: PerPersonService,
        private perCompanyService: PerCompanyService,
        private defItemService: DefItemService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
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
        /*
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        */
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.HIZMT).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.hizmtItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.BRANS).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.bransItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.UNVAN).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.unvanItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.KADRO).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.kadroItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.KARYR).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.karyrItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findAllByTypeId(EnmType.KONUM).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.konumItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.commonService.findEnumByTypeId(EnmList.Sozlesme).subscribe(
            (res: HttpResponse<IEnmEnum[]>) => {
                this.enmSozlesmeList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.commonService.findEnumByTypeId(EnmList.Medeni).subscribe(
            (res: HttpResponse<IEnmEnum[]>) => {
                this.enmMedeniList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.commonService.findEnumByTypeId(EnmList.Cins).subscribe(
            (res: HttpResponse<IEnmEnum[]>) => {
                this.enmCinsList = res.body;
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
    trackEnumById(index: number, item: IUser) {
        return item.id;
    }
}
