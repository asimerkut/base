import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerPeriodState } from 'app/shared/model/per-period-state.model';
import { Principal } from 'app/core';
import { PerPeriodStateService } from './per-period-state.service';

@Component({
    selector: 'jhi-per-period-state',
    templateUrl: './per-period-state.component.html'
})
export class PerPeriodStateComponent implements OnInit, OnDestroy {
    perPeriodStates: IPerPeriodState[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private perPeriodStateService: PerPeriodStateService,
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
            this.perPeriodStateService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPerPeriodState[]>) => (this.perPeriodStates = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.perPeriodStateService.query().subscribe(
            (res: HttpResponse<IPerPeriodState[]>) => {
                this.perPeriodStates = res.body;
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
        this.registerChangeInPerPeriodStates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerPeriodState) {
        return item.id;
    }

    registerChangeInPerPeriodStates() {
        this.eventSubscriber = this.eventManager.subscribe('perPeriodStateListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
