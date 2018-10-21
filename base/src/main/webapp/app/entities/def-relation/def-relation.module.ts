import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    DefRelationComponent,
    DefRelationDetailComponent,
    DefRelationUpdateComponent,
    DefRelationDeletePopupComponent,
    DefRelationDeleteDialogComponent,
    defRelationRoute,
    defRelationPopupRoute
} from './';

const ENTITY_STATES = [...defRelationRoute, ...defRelationPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefRelationComponent,
        DefRelationDetailComponent,
        DefRelationUpdateComponent,
        DefRelationDeleteDialogComponent,
        DefRelationDeletePopupComponent
    ],
    entryComponents: [DefRelationComponent, DefRelationUpdateComponent, DefRelationDeleteDialogComponent, DefRelationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefRelationModule {}
