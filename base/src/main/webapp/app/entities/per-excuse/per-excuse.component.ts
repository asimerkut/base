import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerExcuse } from 'app/shared/model/per-excuse.model';
import { Principal } from 'app/core';
import { PerExcuseService } from './per-excuse.service';

@Component({
    selector: 'jhi-per-excuse',
    templateUrl: './per-excuse.component.html'
})
export class PerExcuseComponent implements OnInit, OnDestroy {
    perExcuses: IPerExcuse[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private perExcuseService: PerExcuseService,
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
            this.perExcuseService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPerExcuse[]>) => (this.perExcuses = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.perExcuseService.query().subscribe(
            (res: HttpResponse<IPerExcuse[]>) => {
                this.perExcuses = res.body;
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
        this.registerChangeInPerExcuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerExcuse) {
        return item.id;
    }

    registerChangeInPerExcuses() {
        this.eventSubscriber = this.eventManager.subscribe('perExcuseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
