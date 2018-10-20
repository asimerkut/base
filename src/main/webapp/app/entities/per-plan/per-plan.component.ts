import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerPlan } from 'app/shared/model/per-plan.model';
import { Principal } from 'app/core';
import { PerPlanService } from './per-plan.service';

@Component({
    selector: 'jhi-per-plan',
    templateUrl: './per-plan.component.html'
})
export class PerPlanComponent implements OnInit, OnDestroy {
    perPlans: IPerPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private perPlanService: PerPlanService,
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
            this.perPlanService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPerPlan[]>) => (this.perPlans = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.perPlanService.query().subscribe(
            (res: HttpResponse<IPerPlan[]>) => {
                this.perPlans = res.body;
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
        this.registerChangeInPerPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerPlan) {
        return item.id;
    }

    registerChangeInPerPlans() {
        this.eventSubscriber = this.eventManager.subscribe('perPlanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
