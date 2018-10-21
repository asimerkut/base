import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerExcuseComponent,
    PerExcuseDetailComponent,
    PerExcuseUpdateComponent,
    PerExcuseDeletePopupComponent,
    PerExcuseDeleteDialogComponent,
    perExcuseRoute,
    perExcusePopupRoute
} from './';

const ENTITY_STATES = [...perExcuseRoute, ...perExcusePopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerExcuseComponent,
        PerExcuseDetailComponent,
        PerExcuseUpdateComponent,
        PerExcuseDeleteDialogComponent,
        PerExcuseDeletePopupComponent
    ],
    entryComponents: [PerExcuseComponent, PerExcuseUpdateComponent, PerExcuseDeleteDialogComponent, PerExcuseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerExcuseModule {}
