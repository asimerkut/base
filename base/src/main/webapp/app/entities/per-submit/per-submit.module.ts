import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { BaseSharedModule } from 'app/shared';
import { PerSubmitComponent, perSubmitRoute } from './';
import { EventService } from './service/event.service';

import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/components/button/button';

const ENTITY_STATES = [...perSubmitRoute];

@NgModule({
    imports: [
        BaseSharedModule,
        ButtonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ScheduleModule,
        RadioButtonModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        CheckboxModule,
        ButtonModule,
        GrowlModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, EventService],
    declarations: [PerSubmitComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BasePerSubmitModule {}
