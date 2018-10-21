import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/components/table/table';

import {FinSharedModule} from '../../shared';
import {
    DefTypeComponent,
    DefTypeDeleteDialogComponent,
    DefTypeDeletePopupComponent,
    DefTypeDetailComponent,
    DefTypeDialogComponent,
    DefTypePopupComponent,
    defTypePopupRoute,
    DefTypePopupService,
    defTypeRoute,
    DefTypeService,
} from './';

const ENTITY_STATES = [
    ...defTypeRoute,
    ...defTypePopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        TableModule
    ],
    declarations: [
        DefTypeComponent,
        DefTypeDetailComponent,
        DefTypeDialogComponent,
        DefTypeDeleteDialogComponent,
        DefTypePopupComponent,
        DefTypeDeletePopupComponent,
    ],
    entryComponents: [
        DefTypeComponent,
        DefTypeDialogComponent,
        DefTypePopupComponent,
        DefTypeDeleteDialogComponent,
        DefTypeDeletePopupComponent,
    ],
    providers: [
        DefTypeService,
        DefTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinDefTypeModule {
}
