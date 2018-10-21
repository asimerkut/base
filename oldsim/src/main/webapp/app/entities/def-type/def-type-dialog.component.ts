import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DefType} from './def-type.model';
import {DefTypePopupService} from './def-type-popup.service';
import {DefTypeService} from './def-type.service';
import {DefItem, DefItemService} from '../def-item';
import {EnmTypeId} from './index';

@Component({
    selector: 'jhi-def-type-dialog',
    templateUrl: './def-type-dialog.component.html'
})
export class DefTypeDialogComponent implements OnInit {

    defType: DefType;
    isSaving: boolean;
    enmTypeList: any[];

    constructor(public activeModal: NgbActiveModal,
                private defTypeService: DefTypeService,
                private eventManager: JhiEventManager,
                private defItemService: DefItemService,
                private jhiAlertService: JhiAlertService) {
    }

    ngOnInit() {
        this.isSaving = false;

        this.defItemService.findEnumByTypeId(EnmTypeId.EnmType)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.enmTypeList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.defType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.defTypeService.update(this.defType));
        } else {
            this.subscribeToSaveResponse(
                this.defTypeService.create(this.defType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DefType>>) {
        result.subscribe((res: HttpResponse<DefType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DefType) {
        this.eventManager.broadcast({name: 'defTypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-def-type-popup',
    template: ''
})
export class DefTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private defTypePopupService: DefTypePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.defTypePopupService
                    .open(DefTypeDialogComponent as Component, params['id']);
            } else {
                this.defTypePopupService
                    .open(DefTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
