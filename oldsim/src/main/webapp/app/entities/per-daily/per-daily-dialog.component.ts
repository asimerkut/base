import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PerDaily} from './per-daily.model';
import {PerDailyPopupService} from './per-daily-popup.service';
import {PerDailyService} from './per-daily.service';
import {PerCompany, PerCompanyService} from '../per-company';

@Component({
    selector: 'jhi-per-daily-dialog',
    templateUrl: './per-daily-dialog.component.html'
})
export class PerDailyDialogComponent implements OnInit {

    perDaily: PerDaily;
    isSaving: boolean;

    percompanies: PerCompany[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private perDailyService: PerDailyService,
                private perCompanyService: PerCompanyService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perCompanyService.query()
            .subscribe((res: HttpResponse<PerCompany[]>) => {
                this.percompanies = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.perDaily.okul = this.perDailyService.okul;
        if (this.perDaily.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perDailyService.update(this.perDaily));
        } else {
            this.subscribeToSaveResponse(
                this.perDailyService.create(this.perDaily));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PerDaily>>) {
        result.subscribe((res: HttpResponse<PerDaily>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PerDaily) {
        this.eventManager.broadcast({name: 'perDailyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerCompanyById(index: number, item: PerCompany) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-per-daily-popup',
    template: ''
})
export class PerDailyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private perDailyPopupService: PerDailyPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.perDailyPopupService
                    .open(PerDailyDialogComponent as Component, params['id']);
            } else {
                this.perDailyPopupService
                    .open(PerDailyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
