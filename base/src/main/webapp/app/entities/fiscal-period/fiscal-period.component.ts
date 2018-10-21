import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { Principal } from 'app/core';
import { FiscalPeriodService } from './fiscal-period.service';

@Component({
    selector: 'jhi-fiscal-period',
    templateUrl: './fiscal-period.component.html'
})
export class FiscalPeriodComponent implements OnInit, OnDestroy {
    fiscalPeriods: IFiscalPeriod[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fiscalPeriodService: FiscalPeriodService,
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
            this.fiscalPeriodService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFiscalPeriod[]>) => (this.fiscalPeriods = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fiscalPeriodService.query().subscribe(
            (res: HttpResponse<IFiscalPeriod[]>) => {
                this.fiscalPeriods = res.body;
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
        this.registerChangeInFiscalPeriods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFiscalPeriod) {
        return item.id;
    }

    registerChangeInFiscalPeriods() {
        this.eventSubscriber = this.eventManager.subscribe('fiscalPeriodListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
