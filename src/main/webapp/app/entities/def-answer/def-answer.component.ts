import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDefAnswer } from 'app/shared/model/def-answer.model';
import { Principal } from 'app/core';
import { DefAnswerService } from './def-answer.service';

@Component({
    selector: 'jhi-def-answer',
    templateUrl: './def-answer.component.html'
})
export class DefAnswerComponent implements OnInit, OnDestroy {
    defAnswers: IDefAnswer[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private defAnswerService: DefAnswerService,
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
            this.defAnswerService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDefAnswer[]>) => (this.defAnswers = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.defAnswerService.query().subscribe(
            (res: HttpResponse<IDefAnswer[]>) => {
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
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDefAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefAnswer) {
        return item.id;
    }

    registerChangeInDefAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('defAnswerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
