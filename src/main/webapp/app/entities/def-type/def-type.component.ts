import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDefType } from 'app/shared/model/def-type.model';
import { Principal } from 'app/core';
import { DefTypeService } from './def-type.service';

@Component({
    selector: 'jhi-def-type',
    templateUrl: './def-type.component.html'
})
export class DefTypeComponent implements OnInit, OnDestroy {
    defTypes: IDefType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private defTypeService: DefTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.defTypeService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDefType[]>) => (this.defTypes = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.defTypeService.query().subscribe(
            (res: HttpResponse<IDefType[]>) => {
                this.defTypes = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDefTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefType) {
        return item.id;
    }

    registerChangeInDefTypes() {
        this.eventSubscriber = this.eventManager.subscribe('defTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
