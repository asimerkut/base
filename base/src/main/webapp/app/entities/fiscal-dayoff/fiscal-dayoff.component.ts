import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';
import { Principal } from 'app/core';
import { FiscalDayoffService } from './fiscal-dayoff.service';

@Component({
    selector: 'jhi-fiscal-dayoff',
    templateUrl: './fiscal-dayoff.component.html'
})
export class FiscalDayoffComponent implements OnInit, OnDestroy {
    fiscalDayoffs: IFiscalDayoff[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fiscalDayoffService: FiscalDayoffService,
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
            this.fiscalDayoffService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IFiscalDayoff[]>) => (this.fiscalDayoffs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fiscalDayoffService.query().subscribe(
            (res: HttpResponse<IFiscalDayoff[]>) => {
                this.fiscalDayoffs = res.body;
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
        this.registerChangeInFiscalDayoffs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFiscalDayoff) {
        return item.id;
    }

    registerChangeInFiscalDayoffs() {
        this.eventSubscriber = this.eventManager.subscribe('fiscalDayoffListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
