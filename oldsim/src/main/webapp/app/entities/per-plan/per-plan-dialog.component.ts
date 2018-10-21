import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PerPlan} from './per-plan.model';
import {PerPlanPopupService} from './per-plan-popup.service';
import {PerPlanService} from './per-plan.service';
import {PerPerson, PerPersonService} from '../per-person';
import {DefItem, DefItemService} from '../def-item';
import {EnmTypeId} from '../def-type';

@Component({
    selector: 'jhi-per-plan-dialog',
    templateUrl: './per-plan-dialog.component.html'
})
export class PerPlanDialogComponent implements OnInit {

    perPlan: PerPlan;
    isSaving: boolean;

    perpeople: PerPerson[];

    startDateDp: any;

    enmDayNoList: any[];
    enmDersGrupList: any[];

    dersItemList: DefItem[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private perPlanService: PerPlanService,
                private perPersonService: PerPersonService,
                private defItemService: DefItemService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perPersonService.query()
            .subscribe((res: HttpResponse<PerPerson[]>) => {
                this.perpeople = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findEnumByTypeId(EnmTypeId.EnmDay)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmDayNoList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.defItemService.findEnumByTypeId(EnmTypeId.EnmDersGrup)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmDersGrupList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.defItemService.findAllByTypeId(EnmTypeId.DERS)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.dersItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.perPlan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perPlanService.update(this.perPlan));
        } else {
            this.subscribeToSaveResponse(
                this.perPlanService.create(this.perPlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PerPlan>>) {
        result.subscribe((res: HttpResponse<PerPlan>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PerPlan) {
        this.eventManager.broadcast({name: 'perPlanListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerPersonById(index: number, item: PerPerson) {
        return item.id;
    }

    trackDefItemById(index: number, item: DefItem) {
        return item.id;
    }

    trackEnumById(index: number, item: any) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-per-plan-popup',
    template: ''
})
export class PerPlanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private perPlanPopupService: PerPlanPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.perPlanPopupService
                    .open(PerPlanDialogComponent as Component, params['id']);
            } else {
                this.perPlanPopupService
                    .open(PerPlanDialogComponent as Component, null, params['startDate']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
