import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    FiscalDayoffComponent,
    FiscalDayoffDetailComponent,
    FiscalDayoffUpdateComponent,
    FiscalDayoffDeletePopupComponent,
    FiscalDayoffDeleteDialogComponent,
    fiscalDayoffRoute,
    fiscalDayoffPopupRoute
} from './';

const ENTITY_STATES = [...fiscalDayoffRoute, ...fiscalDayoffPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiscalDayoffComponent,
        FiscalDayoffDetailComponent,
        FiscalDayoffUpdateComponent,
        FiscalDayoffDeleteDialogComponent,
        FiscalDayoffDeletePopupComponent
    ],
    entryComponents: [
        FiscalDayoffComponent,
        FiscalDayoffUpdateComponent,
        FiscalDayoffDeleteDialogComponent,
        FiscalDayoffDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseFiscalDayoffModule {}
