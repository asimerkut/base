import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    DefTypeComponent,
    DefTypeDetailComponent,
    DefTypeUpdateComponent,
    DefTypeDeletePopupComponent,
    DefTypeDeleteDialogComponent,
    defTypeRoute,
    defTypePopupRoute
} from './';

const ENTITY_STATES = [...defTypeRoute, ...defTypePopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefTypeComponent,
        DefTypeDetailComponent,
        DefTypeUpdateComponent,
        DefTypeDeleteDialogComponent,
        DefTypeDeletePopupComponent
    ],
    entryComponents: [DefTypeComponent, DefTypeUpdateComponent, DefTypeDeleteDialogComponent, DefTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefTypeModule {}
