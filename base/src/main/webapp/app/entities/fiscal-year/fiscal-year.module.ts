import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    FiscalYearComponent,
    FiscalYearDetailComponent,
    FiscalYearUpdateComponent,
    FiscalYearDeletePopupComponent,
    FiscalYearDeleteDialogComponent,
    fiscalYearRoute,
    fiscalYearPopupRoute
} from './';

const ENTITY_STATES = [...fiscalYearRoute, ...fiscalYearPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiscalYearComponent,
        FiscalYearDetailComponent,
        FiscalYearUpdateComponent,
        FiscalYearDeleteDialogComponent,
        FiscalYearDeletePopupComponent
    ],
    entryComponents: [FiscalYearComponent, FiscalYearUpdateComponent, FiscalYearDeleteDialogComponent, FiscalYearDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseFiscalYearModule {}
