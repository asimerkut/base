import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {PerPlan} from './per-plan.model';
import {PerPlanService} from './per-plan.service';
import {Principal} from '../../shared';
import {ComboSelModel} from '../common/combo-sel-model';
import {Message} from 'primeng/components/common/api';
import {PlanEvent} from '../common/plan-event';
import {DefItem, DefItemService} from '../def-item';
import {EnmTypeId} from '../def-type';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'jhi-per-plan',
    templateUrl: './per-plan.component.html'
})
export class PerPlanComponent implements OnInit, OnDestroy {

    msgs: Message[] = [];
    event: PlanEvent;
    perPlan: PerPlan;

    dialogVisible = false;

    // perPlans: PerPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    events: any[];
    headerConfig: any;
    comboSelModel: ComboSelModel = new ComboSelModel();
    lastViewStart: any;
    lastViewEnd: any;

    dersItemList: DefItem[];

    constructor(private perPlanService: PerPlanService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private activatedRoute: ActivatedRoute,
                private defItemService: DefItemService,
                private principal: Principal) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        return;
        /*
        this.currentSearch = JSON.stringify({'query': {'selId': (this.comboSelModel.comboSel == null ? '2000-01-01' : this.comboSelModel.comboSel.startDate)} });

        if (this.currentSearch) {
            this.perPlanService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PerPlan[]>) => this.perPlans = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.perPlanService.query().subscribe(
            (res: HttpResponse<PerPlan[]>) => {
                this.perPlans = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        */
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
        this.perPlanService.getPlanDateList('0')
            .subscribe((res: HttpResponse<any[]>) => {
                this.comboSelModel.comboList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.loadAll();

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        // this.perPlanService.getEvents().subscribe((events: any) => {this.events = events.data; });

        this.headerConfig = {
            left: null,
            center: null,
            right: null
        };

        this.defItemService.findAllByTypeId(EnmTypeId.DERS)
            .subscribe((res: HttpResponse<DefItem[]>) => {
                this.dersItemList = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));

        this.registerChangeInPerPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PerPlan) {
        return item.id;
    }

    trackComboSel(index, item: string) {
        return index;
    }

    registerChangeInPerPlans() {
        this.eventSubscriber = this.eventManager.subscribe('perPlanListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadEvents(event: any) {
        const startDate = (this.comboSelModel.comboSel == null ? '2000-01-01' : this.comboSelModel.comboSel.startDate);

        if (event != null) {
            this.lastViewStart = event.view.start;
            this.lastViewEnd = event.view.end;
        }

        const viewStart = this.lastViewStart;
        const viewEnd = this.lastViewEnd;

        this.perPlanService.getEvents(startDate, viewStart, viewEnd).subscribe((events: any) => {
            this.events = events.data;
        });
    }

    onChangeComboSel($event) {
        this.loadAll();
        this.loadEvents(null);
    }

    handleDayClick(event: any) {
        this.event = new PlanEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
    }

    handleEventClick(e: any) {
        this.event = new PlanEvent();
        this.event.title = e.calEvent.title;
        this.event.id = e.calEvent.id;
        this.event.start = e.calEvent.start;
        this.event.end = e.calEvent.end;
        this.event.allDay = e.calEvent.allDay;
        this.event.dersSira = e.calEvent.dersSira;
        this.event.dersAdet = e.calEvent.dersAdet;
        this.event.ders = e.calEvent.ders;
        this.event.cellId = e.calEvent.cellId;
        this.dialogVisible = true;
    }

    handleEventMouseover(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventMouseout(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventDragStart(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventDragStop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventDrop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventResizeStart(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventResizeStop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    onEventResize(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    handleDrop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'Event mouse over'});
    }

    handleViewDestroy(event: any) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'The view is about to be removed from the DOM'});
    }

    saveEvent() {
        // update
        this.perPlan = new PerPlan();
        if (this.event.dersAdet == null || this.event.dersAdet < 1) {
            this.event.dersAdet = 1;
        }
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.event.title = this.event.ders.name;
                this.events[index] = this.event;
                this.perPlan.id = this.event.id;
                this.perPlan.dersAdet = this.event.dersAdet;
                this.perPlan.cellId = this.event.cellId;
                this.perPlan.dersSira = this.event.cellId;
                // this.perPlan.startDate = this.event.start;
                // this.perPlan.dersSira = this.event.dersSira;
                // this.perPlan.person = this.event.person
                // this.perPlan.dayNo = this.event.dayNo
                this.perPlan.ders = new DefItem();
                if (this.event.ders) {
                    this.perPlan.ders.id = this.event.ders.id;
                }
                this.subscribeToSaveResponse(
                    this.perPlanService.update(this.perPlan));
            }
        } else if (this.event.start.length === 10) { // allDay
            const allDayId: number = -1 *
                Number(this.event.start.substr(0, 4) +
                    this.event.start.substr(5, 2) +
                    this.event.start.substr(8, 2));
            this.event.id = allDayId;
            this.events.push(this.event);
            this.perPlan.id = this.event.id;
            this.perPlan.dersAdet = this.event.dersAdet;
            this.perPlan.cellId = this.event.cellId;
            this.perPlan.dersSira = 0;
            // this.perPlan.startDate = this.event.start;
            // this.perPlan.dersSira = this.event.dersSira;
            // this.perPlan.person = this.event.person
            // this.perPlan.dayNo = this.event.dayNo
            this.perPlan.ders = new DefItem();
            if (this.event.ders) {
                this.perPlan.ders.id = this.event.ders.id;
            }
            this.subscribeToSaveResponse(
                this.perPlanService.update(this.perPlan));
        }
        this.perPlan = null;
        this.dialogVisible = false;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PerPlan>>) {
        result.subscribe((res: HttpResponse<PerPlan>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PerPlan) {
        // this.eventManager.broadcast({ name: 'perPlanListModification', content: 'OK'});
        // this.isSaving = false;
        // this.activeModal.dismiss(result);
        this.perPlan = null;
        this.loadEvents(null);
    }

    private onSaveError() {
        // this.isSaving = false;
    }

    deleteEvent() {
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            const deletedId = this.event.id;
            this.event.id = this.event.cellId;
            this.event.title = null;
            this.events[index] = this.event;
            this.dialogVisible = false;
            if (index >= 0) {
                this.perPlanService.delete(deletedId).subscribe((response) => {
                    this.eventManager.broadcast({
                        name: 'perPlanListModification',
                        content: 'Deleted an perPlan'
                    });
                    this.dialogVisible = false;
                    this.loadEvents(null);
                });
            }
        } else {
            // this.event.id = this.idGen++;
            // this.events.push(this.event);
            // this.event = null;
        }
        this.perPlan = null;
        this.dialogVisible = false;
        this.loadEvents(null);
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }

    trackDefItemById(index: number, item: DefItem) {
        return item.id;
    }
}
