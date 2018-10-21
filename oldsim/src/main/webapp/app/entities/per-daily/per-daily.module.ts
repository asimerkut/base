import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    PerDailyComponent,
    PerDailyDeleteDialogComponent,
    PerDailyDeletePopupComponent,
    PerDailyDetailComponent,
    PerDailyDialogComponent,
    PerDailyPopupComponent,
    perDailyPopupRoute,
    PerDailyPopupService,
    perDailyRoute,
    PerDailyService,
} from './';

const ENTITY_STATES = [
    ...perDailyRoute,
    ...perDailyPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerDailyComponent,
        PerDailyDetailComponent,
        PerDailyDialogComponent,
        PerDailyDeleteDialogComponent,
        PerDailyPopupComponent,
        PerDailyDeletePopupComponent,
    ],
    entryComponents: [
        PerDailyComponent,
        PerDailyDialogComponent,
        PerDailyPopupComponent,
        PerDailyDeleteDialogComponent,
        PerDailyDeletePopupComponent,
    ],
    providers: [
        PerDailyService,
        PerDailyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinPerDailyModule {
}
