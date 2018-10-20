import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerCompanyComponent,
    PerCompanyDetailComponent,
    PerCompanyUpdateComponent,
    PerCompanyDeletePopupComponent,
    PerCompanyDeleteDialogComponent,
    perCompanyRoute,
    perCompanyPopupRoute
} from './';

const ENTITY_STATES = [...perCompanyRoute, ...perCompanyPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerCompanyComponent,
        PerCompanyDetailComponent,
        PerCompanyUpdateComponent,
        PerCompanyDeleteDialogComponent,
        PerCompanyDeletePopupComponent
    ],
    entryComponents: [PerCompanyComponent, PerCompanyUpdateComponent, PerCompanyDeleteDialogComponent, PerCompanyDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerCompanyModule {}
