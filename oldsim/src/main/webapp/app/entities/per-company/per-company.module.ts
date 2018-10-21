import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    PerCompanyComponent,
    PerCompanyDeleteDialogComponent,
    PerCompanyDeletePopupComponent,
    PerCompanyDetailComponent,
    PerCompanyDialogComponent,
    PerCompanyPopupComponent,
    perCompanyPopupRoute,
    PerCompanyPopupService,
    perCompanyRoute,
    PerCompanyService,
} from './';

const ENTITY_STATES = [
    ...perCompanyRoute,
    ...perCompanyPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerCompanyComponent,
        PerCompanyDetailComponent,
        PerCompanyDialogComponent,
        PerCompanyDeleteDialogComponent,
        PerCompanyPopupComponent,
        PerCompanyDeletePopupComponent,
    ],
    entryComponents: [
        PerCompanyComponent,
        PerCompanyDialogComponent,
        PerCompanyPopupComponent,
        PerCompanyDeleteDialogComponent,
        PerCompanyDeletePopupComponent,
    ],
    providers: [
        PerCompanyService,
        PerCompanyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinPerCompanyModule {
}
