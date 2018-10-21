import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    FiscalPeriodComponent,
    FiscalPeriodDetailComponent,
    FiscalPeriodUpdateComponent,
    FiscalPeriodDeletePopupComponent,
    FiscalPeriodDeleteDialogComponent,
    fiscalPeriodRoute,
    fiscalPeriodPopupRoute
} from './';

const ENTITY_STATES = [...fiscalPeriodRoute, ...fiscalPeriodPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiscalPeriodComponent,
        FiscalPeriodDetailComponent,
        FiscalPeriodUpdateComponent,
        FiscalPeriodDeleteDialogComponent,
        FiscalPeriodDeletePopupComponent
    ],
    entryComponents: [
        FiscalPeriodComponent,
        FiscalPeriodUpdateComponent,
        FiscalPeriodDeleteDialogComponent,
        FiscalPeriodDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseFiscalPeriodModule {}
