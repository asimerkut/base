import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    PerPlanComponent,
    PerPlanDeleteDialogComponent,
    PerPlanDeletePopupComponent,
    PerPlanDetailComponent,
    PerPlanDialogComponent,
    PerPlanPopupComponent,
    perPlanPopupRoute,
    PerPlanPopupService,
    perPlanRoute,
    PerPlanService,
} from './';
import {ScheduleModule} from 'primeng/components/schedule/schedule';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

const ENTITY_STATES = [
    ...perPlanRoute,
    ...perPlanPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES),

        ScheduleModule,
        DialogModule,
        ButtonModule
    ],
    declarations: [
        PerPlanComponent,
        PerPlanDetailComponent,
        PerPlanDialogComponent,
        PerPlanDeleteDialogComponent,
        PerPlanPopupComponent,
        PerPlanDeletePopupComponent,
    ],
    entryComponents: [
        PerPlanComponent,
        PerPlanDialogComponent,
        PerPlanPopupComponent,
        PerPlanDeleteDialogComponent,
        PerPlanDeletePopupComponent,
    ],
    providers: [
        PerPlanService,
        PerPlanPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinPerPlanModule {
}
