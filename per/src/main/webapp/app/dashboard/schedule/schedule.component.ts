import { Component, OnInit, ViewChild } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { CalendarComponent } from 'ng-fullcalendar';
import { ScheduleService } from './schedule.service';
import { Options } from 'fullcalendar';

@Component({
    selector: 'jhi-schedule',
    templateUrl: './schedule.component.html',
    styles: []
})
export class ScheduleComponent implements OnInit {
    calendarOptions: Options;
    displayEvent: any;
    events = null;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(protected scheduleService: ScheduleService) {}

    ngOnInit() {
        this.calendarOptions = {
            editable: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: []
        };
    }
    loadevents() {
        this.scheduleService.getEvents().subscribe(data => {
            this.events = data;
        });
    }
    clickButton(model: any) {
        this.displayEvent = model;
    }
    dayClick(model: any) {
        console.log(model);
    }
    eventClick(model: any) {
        model = {
            event: {
                id: model.event.id,
                start: model.event.start,
                end: model.event.end,
                title: model.event.title,
                allDay: model.event.allDay
                // other params
            },
            duration: {}
        };
        this.displayEvent = model;
    }
    updateEvent(model: any) {
        model = {
            event: {
                id: model.event.id,
                start: model.event.start,
                end: model.event.end,
                title: model.event.title
                // other params
            },
            duration: {
                _data: model.duration._data
            }
        };
        this.displayEvent = model;
    }
}
