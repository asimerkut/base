import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PerDaily} from './per-daily.model';
import {PerDailyService} from './per-daily.service';
import {Principal} from '../../shared';
import {ComboSelModel} from '../common/combo-sel-model';
import {PerCompanyService} from '../per-company/per-company.service';
import {PerCompany} from '../per-company/per-company.model';

@Component({
    selector: 'jhi-per-daily',
    templateUrl: './per-daily.component.html'
})
export class PerDailyComponent implements OnInit, OnDestroy {
    perDailies: PerDaily[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    comboSelModel: ComboSelModel = new ComboSelModel();

    constructor(private perDailyService: PerDailyService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private activatedRoute: ActivatedRoute,
                private principal: Principal,
                private perCompanyService: PerCompanyService
                ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.perDailyService.search({
                query: this.currentSearch,
            }).subscribe(
                (res: HttpResponse<PerDaily[]>) => this.perDailies = res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.perDailyService.query().subscribe(
            (res: HttpResponse<PerDaily[]>) => {
                this.perDailies = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        const comboSelId = this.comboSelModel.comboSel == null ? 0 : this.comboSelModel.comboSel.id;
        this.perDailyService.okul.id = comboSelId;
        const searchFilter = {
            selId: comboSelId
        };
        this.currentSearch = JSON.stringify(searchFilter);
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.perCompanyService.query()
            .subscribe((res: HttpResponse<PerCompany[]>) => {
                this.comboSelModel.comboList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPerDailies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PerDaily) {
        return item.id;
    }

    registerChangeInPerDailies() {
        this.eventSubscriber = this.eventManager.subscribe('perDailyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onChangeComboSel($event) {
        this.search(null);
    }

    trackComboSel(index, item: any) {
        return (item == null) ? 0 : item.id;
    }
}
