import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerCompany } from 'app/shared/model/per-company.model';
import { Principal } from 'app/core';
import { PerCompanyService } from './per-company.service';

@Component({
    selector: 'jhi-per-company',
    templateUrl: './per-company.component.html'
})
export class PerCompanyComponent implements OnInit, OnDestroy {
    perCompanies: IPerCompany[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private perCompanyService: PerCompanyService,
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
            this.perCompanyService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPerCompany[]>) => (this.perCompanies = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.perCompanyService.query().subscribe(
            (res: HttpResponse<IPerCompany[]>) => {
                this.perCompanies = res.body;
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
        this.registerChangeInPerCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerCompany) {
        return item.id;
    }

    registerChangeInPerCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('perCompanyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
