import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {PerDaily} from './per-daily.model';
import {PerDailyService} from './per-daily.service';

@Component({
    selector: 'jhi-per-daily-detail',
    templateUrl: './per-daily-detail.component.html'
})
export class PerDailyDetailComponent implements OnInit, OnDestroy {

    perDaily: PerDaily;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager,
                private perDailyService: PerDailyService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPerDailies();
    }

    load(id) {
        this.perDailyService.find(id)
            .subscribe((perDailyResponse: HttpResponse<PerDaily>) => {
                this.perDaily = perDailyResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPerDailies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'perDailyListModification',
            (response) => this.load(this.perDaily.id)
        );
    }
}
