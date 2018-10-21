import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { Principal } from 'app/core';
import { FiscalYearService } from './fiscal-year.service';

@Component({
    selector: 'jhi-fiscal-year',
    templateUrl: './fiscal-year.component.html'
})
export class FiscalYearComponent implements OnInit, OnDestroy {
    fiscalYears: IFiscalYear[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fiscalYearService: FiscalYearService,
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
            this.fiscalYearService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFiscalYear[]>) => (this.fiscalYears = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fiscalYearService.query().subscribe(
            (res: HttpResponse<IFiscalYear[]>) => {
                this.fiscalYears = res.body;
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
        this.registerChangeInFiscalYears();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFiscalYear) {
        return item.id;
    }

    registerChangeInFiscalYears() {
        this.eventSubscriber = this.eventManager.subscribe('fiscalYearListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
