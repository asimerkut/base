import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { BaseSharedModule } from 'app/shared';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { GrowlModule } from 'primeng/primeng';

import { EventService } from './service/event.service';

import { PerSubmitComponent, perSubmitRoute } from './';

const ENTITY_STATES = [...perSubmitRoute];

@NgModule({
    imports: [
        BaseSharedModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ScheduleModule,
        CalendarModule,
        GrowlModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [PerSubmitComponent],
    entryComponents: [PerSubmitComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, EventService]
})
export class BasePerSubmitModule {}
