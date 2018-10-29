import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    DefPivotComponent,
    DefPivotDetailComponent,
    DefPivotUpdateComponent,
    DefPivotDeletePopupComponent,
    DefPivotDeleteDialogComponent,
    defPivotRoute,
    defPivotPopupRoute
} from './';

const ENTITY_STATES = [...defPivotRoute, ...defPivotPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefPivotComponent,
        DefPivotDetailComponent,
        DefPivotUpdateComponent,
        DefPivotDeleteDialogComponent,
        DefPivotDeletePopupComponent
    ],
    entryComponents: [DefPivotComponent, DefPivotUpdateComponent, DefPivotDeleteDialogComponent, DefPivotDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefPivotModule {}
