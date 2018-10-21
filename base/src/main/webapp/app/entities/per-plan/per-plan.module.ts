import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerPlanComponent,
    PerPlanDetailComponent,
    PerPlanUpdateComponent,
    PerPlanDeletePopupComponent,
    PerPlanDeleteDialogComponent,
    perPlanRoute,
    perPlanPopupRoute
} from './';

const ENTITY_STATES = [...perPlanRoute, ...perPlanPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerPlanComponent,
        PerPlanDetailComponent,
        PerPlanUpdateComponent,
        PerPlanDeleteDialogComponent,
        PerPlanDeletePopupComponent
    ],
    entryComponents: [PerPlanComponent, PerPlanUpdateComponent, PerPlanDeleteDialogComponent, PerPlanDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerPlanModule {}
