import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from '../../shared';
import { ChartModule, ScheduleModule } from 'primeng/primeng';

import { ScheduleComponent, scheduleRoute } from './';
import { FullCalendarModule } from 'ng-fullcalendar';
import { ScheduleService } from './schedule.service';

const DASHBOARD_STATES = [scheduleRoute];

@NgModule({
    imports: [FullCalendarModule, ScheduleModule, BaseSharedModule, ChartModule, RouterModule.forRoot(DASHBOARD_STATES, { useHash: true })],
    declarations: [ScheduleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ScheduleService]
})
export class BaseScheduleModule {}
