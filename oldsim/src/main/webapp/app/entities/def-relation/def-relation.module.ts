import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    DefRelationComponent,
    DefRelationDeleteDialogComponent,
    DefRelationDeletePopupComponent,
    DefRelationDetailComponent,
    DefRelationDialogComponent,
    DefRelationPopupComponent,
    defRelationPopupRoute,
    DefRelationPopupService,
    defRelationRoute,
    DefRelationService,
    DefRelationTypesourceComponent,
} from './';

const ENTITY_STATES = [
    ...defRelationRoute,
    ...defRelationPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefRelationComponent,
        DefRelationTypesourceComponent,
        DefRelationDetailComponent,
        DefRelationDialogComponent,
        DefRelationDeleteDialogComponent,
        DefRelationPopupComponent,
        DefRelationDeletePopupComponent,
    ],
    entryComponents: [
        DefRelationComponent,
        DefRelationDialogComponent,
        DefRelationPopupComponent,
        DefRelationDeleteDialogComponent,
        DefRelationDeletePopupComponent,
    ],
    providers: [
        DefRelationService,
        DefRelationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinDefRelationModule {
}
