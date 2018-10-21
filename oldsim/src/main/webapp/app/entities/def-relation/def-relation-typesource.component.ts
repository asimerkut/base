import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DefRelation} from './def-relation.model';
import {DefRelationService} from './def-relation.service';
import {Principal} from '../../shared';
import {DefType} from '../def-type';

@Component({
    selector: 'jhi-def-relation-typesource',
    templateUrl: './def-relation-typesource.component.html'
})
export class DefRelationTypesourceComponent implements OnInit, OnDestroy {
    defRelations: DefRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    subscription: Subscription;

    typeSource: DefType = new DefType();

    constructor(private defRelationService: DefRelationService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private activatedRoute: ActivatedRoute,
                private principal: Principal,
                private route: ActivatedRoute) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {

        if (this.typeSource) {
            const searchFilter = {
                selId: this.typeSource.id,
                selCode: this.typeSource.code
            };
            this.currentSearch = JSON.stringify(searchFilter);
        } else {
            this.currentSearch = null;
        }

        if (this.currentSearch) {
            this.defRelationService.search({
                query: this.currentSearch,
            }).subscribe(
                (res: HttpResponse<DefRelation[]>) => this.defRelations = res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.defRelationService.query().subscribe(
            (res: HttpResponse<DefRelation[]>) => {
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
        this.subscription = this.route.params.subscribe((params) => {
            this.typeSource.id = params['id'];
            this.typeSource.code = params['code'];
        });
        this.loadAll();

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDefRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DefRelation) {
        return item.id;
    }

    registerChangeInDefRelations() {
        this.eventSubscriber = this.eventManager.subscribe('defRelationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
