import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DefAnswer} from './def-answer.model';
import {DefAnswerService} from './def-answer.service';
import {Principal} from '../../shared';
import {DefItem} from '../def-item';
import {DefType} from '../def-type';

@Component({
    selector: 'jhi-def-answer-itemsource',
    templateUrl: './def-answer-itemsource.component.html'
})
export class DefAnswerItemsourceComponent implements OnInit, OnDestroy {
    defAnswers: DefAnswer[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    subscription: Subscription;

    typeSource: DefType = new DefType();
    itemSource: DefItem = new DefItem();

    constructor(private defAnswerService: DefAnswerService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private activatedRoute: ActivatedRoute,
                private principal: Principal,
                private route: ActivatedRoute) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.itemSource) {
            const searchFilter = {
                selId: this.itemSource.id
            };
            this.currentSearch = JSON.stringify(searchFilter);
        } else {
            this.currentSearch = null;
        }
        if (this.currentSearch) {
            this.defAnswerService.search({
                query: this.currentSearch,
            }).subscribe(
                (res: HttpResponse<DefAnswer[]>) => this.defAnswers = res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.defAnswerService.query().subscribe(
            (res: HttpResponse<DefAnswer[]>) => {
                this.defAnswers = res.body;
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
            this.itemSource.id = params['id'];
            this.typeSource.id = params['typeId'];
            this.typeSource.code = params['typeCode'];
        });
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDefAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DefAnswer) {
        return item.id;
    }

    registerChangeInDefAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('defAnswerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
