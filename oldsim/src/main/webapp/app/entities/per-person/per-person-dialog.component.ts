import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PerPerson} from './per-person.model';
import {PerPersonPopupService} from './per-person-popup.service';
import {PerPersonService} from './per-person.service';
import {PerCompany, PerCompanyService} from '../per-company';
import {DefItem, DefItemService} from '../def-item';
import {User, UserService} from '../../shared';
import {EnmTypeId} from '../def-type';

@Component({
    selector: 'jhi-per-person-dialog',
    templateUrl: './per-person-dialog.component.html'
})
export class PerPersonDialogComponent implements OnInit {

    perPerson: PerPerson;
    isSaving: boolean;

    percompanies: PerCompany[];

    hizmtItemList: DefItem[];
    bransItemList: DefItem[];
    unvanItemList: DefItem[];
    kadroItemList: DefItem[];
    karyrItemList: DefItem[];
    konumItemList: DefItem[];

    users: User[];

    enmSozlesmeList: any[];
    enmMedeniList: any[];
    enmCinsList: any[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private perPersonService: PerPersonService,
                private perCompanyService: PerCompanyService,
                private defItemService: DefItemService,
                private userService: UserService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perCompanyService.query()
            .subscribe((res: HttpResponse<PerCompany[]>) => {
                this.percompanies = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findEnumByTypeId(EnmTypeId.EnmSozlesme)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmSozlesmeList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.defItemService.findEnumByTypeId(EnmTypeId.EnmMedeni)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmMedeniList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.defItemService.findEnumByTypeId(EnmTypeId.EnmCins)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmCinsList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.HIZMT)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.hizmtItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.BRANS)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.bransItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.UNVAN)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.unvanItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.KADRO)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.kadroItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.KARYR)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.karyrItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.KONUM)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.konumItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.perPerson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perPersonService.update(this.perPerson));
        } else {
            this.subscribeToSaveResponse(
                this.perPersonService.create(this.perPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PerPerson>>) {
        result.subscribe((res: HttpResponse<PerPerson>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PerPerson) {
        this.eventManager.broadcast({name: 'perPersonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnumById(index: number, item: any) {
        return item.id;
    }

    trackPerCompanyById(index: number, item: PerCompany) {
        return item.id;
    }

    trackDefItemById(index: number, item: DefItem) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-per-person-popup',
    template: ''
})
export class PerPersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private perPersonPopupService: PerPersonPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.perPersonPopupService
                    .open(PerPersonDialogComponent as Component, params['id']);
            } else {
                this.perPersonPopupService
                    .open(PerPersonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
