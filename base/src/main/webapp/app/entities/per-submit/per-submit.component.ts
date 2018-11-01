import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal } from 'app/core';
import { PerSubmitService } from './per-submit.service';
import { DefItemService } from '../def-item';
import { Message } from 'primeng/components/common/api';

import { CommonService } from 'app/entities/common';
import { IDefType, DefType, EnmType } from 'app/shared/model/def-type.model';
import { IDefItem, DefItem } from 'app/shared/model/def-item.model';
import { IPerSubmit, PerSubmit } from 'app/shared/model/per-submit.model';

import { Observable } from 'rxjs/Observable';
import { SubmitEvent } from '../common/submit-event';
import { EventService } from './service/event.service'
//import { FullCalendar } from 'primeng/components/fullcalendar/fullcalendar';
import { Schedule } from 'primeng/components/schedule/schedule';

@Component({
    selector: 'jhi-per-submit',
    templateUrl: './per-submit.component.html'
})
export class PerSubmitComponent implements OnInit, OnDestroy {

  //  @ViewChild('fc') fc: FullCalendar;
    msgs: Message[] = [];
    event: SubmitEvent;
    perSubmit: IPerSubmit;

    dialogVisible = false;

    // perSubmits: PerSubmit[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    headerConfig: any;
    lastViewStart: any;
    lastViewEnd: any;

    dersItemList: IDefItem[];

    events: any[];
    options: any;

    constructor(
        private perSubmitService: PerSubmitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private defItemService: DefItemService,
        private principal: Principal,
        private commonService: CommonService,
        private eventService: EventService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        return;
        /*
        //this.currentSearch = JSON.stringify({'query': {'selId': (this.comboSelModel.comboSel == null ? '2000-01-01' : this.comboSelModel.comboSel.startDate)} });
        this.currentSearch = JSON.stringify({'query': {'selId': '2000-01-01' } });

        if (this.currentSearch) {
         this.perSubmitService.search({
         query: this.currentSearch,
         }).subscribe(
         (res: HttpResponse<PerSubmit[]>) => this.perSubmits = res.body,
         (res: HttpErrorResponse) => this.onError(res.message)
         );
         return;
         }
         this.perSubmitService.query().subscribe(
         (res: HttpResponse<PerSubmit[]>) => {
         this.perSubmits = res.body;
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
/*
        this.eventService.getEvents().then(events => {
            this.events = events;
        });
    */

        this.options = {
            //defaultDate: '2017-02-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'agendaWeek'
            },
            editable: true,
            dateClick: (e) =>  {
                console.log('dateClick:'+e);
            },
            eventClick: (info) =>  {
                alert('Event: ' + info.event.title);
                alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                alert('View: ' + info.view.type);

                // change the border color just for fun
                info.el.style.borderColor = 'red';
            },
            nextClick: (e) =>  {
                console.log('next:'+e);
            },
            prevClick: (e) =>  {
                console.log('prev:'+e);
            }
        };

        this.loadAll();

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });

        // this.perSubmitService.getEvents().subscribe((events: any) => {this.events = events.data; });

        this.headerConfig = {
            // left: 'prev, next today',
            // center: 'title',
            // right: 'month,agendaWeek,agendaDay,list'
        };

        this.commonService.findAllByTypeId(EnmType.DERS).subscribe(
            (res: HttpResponse<DefItem[]>) => {
                this.dersItemList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.registerChangeInPerSubmits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PerSubmit) {
        return item.id;
    }

    trackComboSel(index, item: string) {
        return index;
    }

    registerChangeInPerSubmits() {
        this.eventSubscriber = this.eventManager.subscribe('perSubmitListModification', response => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onErrorCustom(resError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: resError.title });
    }

    loadEvents(event: any) {
        if (event != null) {
            this.lastViewStart = event.view.start;
            this.lastViewEnd = event.view.end;
        }

        const viewStart = this.lastViewStart;
        const viewEnd = this.lastViewEnd;

        this.commonService.getEvents(viewStart, viewEnd).subscribe(
            (events: any) => {
                this.events = events.data;
            },
            (res: HttpErrorResponse) => this.onErrorCustom(res.error)
        );
    }

    refresh() {
        //const viewStart = this.commonService.formatDate(this.fc.getCalendar().view.activeStart); //this.lastViewStart;
        //const viewEnd = this.commonService.formatDate(this.fc.getCalendar().view.activeEnd); //this.lastViewEnd;
        const viewStart = this.lastViewStart;
        const viewEnd = this.lastViewEnd;

        this.commonService.initEvents(viewStart, viewEnd).subscribe((events: any) => {
            this.events = events.data;
        });
    }

    onChangeComboSel($event) {
        this.loadAll();
        this.loadEvents(null);
    }

    handleDayClick(event: any) {
        this.event = new SubmitEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
    }

    handleEventClick(e: any) {
        this.event = new SubmitEvent();
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
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventMouseout(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventDragStart(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventDragStop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventDrop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventResizeStart(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventResizeStop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    onEventResize(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    handleDrop(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'Event mouse over' });
    }

    handleViewDestroy(event: any) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: 'The view is about to be removed from the DOM' });
    }

    saveEvent() {
        // update
        this.perSubmit = new PerSubmit();
        if (this.event.dersAdet == null || this.event.dersAdet < 1) {
            this.event.dersAdet = 1;
        }
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.event.title = this.event.ders.name;
                this.events[index] = this.event;
                this.perSubmit.id = this.event.id;
                this.perSubmit.cellId = this.event.cellId;
                this.perSubmit.dersSira = this.event.cellId;
                this.perSubmit.dersAdet = this.event.dersAdet;
                // this.perSubmit.startDate = this.event.start;
                // this.perSubmit.dersSira = this.event.dersSira;
                // this.perSubmit.person = this.event.person
                // this.perSubmit.dayNo = this.event.dayNo
                this.perSubmit.ders = new DefItem();
                if (this.event.ders) {
                    this.perSubmit.ders.id = this.event.ders.id;
                }
                this.subscribeToSaveResponse(this.perSubmitService.update(this.perSubmit));
            }
        } else if (this.event.start.length === 10) {
            // allDay
            const allDayId: number =
                -1 * Number(this.event.start.substr(0, 4) + this.event.start.substr(5, 2) + this.event.start.substr(8, 2));
            this.event.id = allDayId;
            this.events.push(this.event);
            this.perSubmit.id = this.event.id;
            this.perSubmit.dersAdet = this.event.dersAdet;
            this.perSubmit.cellId = this.event.cellId;
            this.perSubmit.dersSira = 0;
            // this.perPlan.startDate = this.event.start;
            // this.perPlan.dersSira = this.event.dersSira;
            // this.perPlan.person = this.event.person
            // this.perPlan.dayNo = this.event.dayNo
            this.perSubmit.ders = new DefItem();
            if (this.event.ders) {
                this.perSubmit.ders.id = this.event.ders.id;
            }
            this.subscribeToSaveResponse(this.perSubmitService.update(this.perSubmit));
        }
        this.perSubmit = null;
        this.dialogVisible = false;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PerSubmit>>) {
        result.subscribe((res: HttpResponse<PerSubmit>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PerSubmit) {
        // this.eventManager.broadcast({ name: 'perSubmitListModification', content: 'OK'});
        // this.isSaving = false;
        // this.activeModal.dismiss(result);
        this.perSubmit = null;
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
                this.perSubmitService.delete(deletedId).subscribe(response => {
                    this.eventManager.broadcast({
                        name: 'perSubmitListModification',
                        content: 'Deleted an perSubmit'
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
        this.perSubmit = null;
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
        this.msgs.push({ severity: 'info', summary: label });
    }

    trackDefItemById(index: number, item: DefItem) {
        return item.id;
    }
}
