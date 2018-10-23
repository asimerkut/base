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

import 'jquery/dist/jquery.min.js';
import 'jquery-ui-dist/jquery-ui.min.js';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';
import * as $ from 'jquery';

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
