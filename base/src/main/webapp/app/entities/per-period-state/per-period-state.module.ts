import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerPeriodStateComponent,
    PerPeriodStateDetailComponent,
    PerPeriodStateUpdateComponent,
    PerPeriodStateDeletePopupComponent,
    PerPeriodStateDeleteDialogComponent,
    perPeriodStateRoute,
    perPeriodStatePopupRoute
} from './';

const ENTITY_STATES = [...perPeriodStateRoute, ...perPeriodStatePopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerPeriodStateComponent,
        PerPeriodStateDetailComponent,
        PerPeriodStateUpdateComponent,
        PerPeriodStateDeleteDialogComponent,
        PerPeriodStateDeletePopupComponent
    ],
    entryComponents: [
        PerPeriodStateComponent,
        PerPeriodStateUpdateComponent,
        PerPeriodStateDeleteDialogComponent,
        PerPeriodStateDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerPeriodStateModule {}
