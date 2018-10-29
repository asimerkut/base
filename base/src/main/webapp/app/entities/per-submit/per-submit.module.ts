import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { BaseSharedModule } from 'app/shared';
import { FullCalendarModule } from 'primeng/components/fullcalendar/fullcalendar';
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
        FullCalendarModule,
        GrowlModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [PerSubmitComponent],
    entryComponents: [PerSubmitComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, EventService]
})
export class BasePerSubmitModule {}
