import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerDailyComponent,
    PerDailyDetailComponent,
    PerDailyUpdateComponent,
    PerDailyDeletePopupComponent,
    PerDailyDeleteDialogComponent,
    perDailyRoute,
    perDailyPopupRoute
} from './';

const ENTITY_STATES = [...perDailyRoute, ...perDailyPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerDailyComponent,
        PerDailyDetailComponent,
        PerDailyUpdateComponent,
        PerDailyDeleteDialogComponent,
        PerDailyDeletePopupComponent
    ],
    entryComponents: [PerDailyComponent, PerDailyUpdateComponent, PerDailyDeleteDialogComponent, PerDailyDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerDailyModule {}
