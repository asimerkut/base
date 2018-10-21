import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDefRelation } from 'app/shared/model/def-relation.model';
import { Principal } from 'app/core';
import { DefRelationService } from './def-relation.service';

@Component({
    selector: 'jhi-def-relation',
    templateUrl: './def-relation.component.html'
})
export class DefRelationComponent implements OnInit, OnDestroy {
    defRelations: IDefRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private defRelationService: DefRelationService,
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
            this.defRelationService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDefRelation[]>) => (this.defRelations = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.defRelationService.query().subscribe(
            (res: HttpResponse<IDefRelation[]>) => {
                this.defRelations = res.body;
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
        this.registerChangeInDefRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefRelation) {
        return item.id;
    }

    registerChangeInDefRelations() {
        this.eventSubscriber = this.eventManager.subscribe('defRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
