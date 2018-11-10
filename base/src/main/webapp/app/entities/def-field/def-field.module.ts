import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    DefFieldComponent,
    DefFieldDetailComponent,
    DefFieldUpdateComponent,
    DefFieldDeletePopupComponent,
    DefFieldDeleteDialogComponent,
    defFieldRoute,
    defFieldPopupRoute
} from './';

const ENTITY_STATES = [...defFieldRoute, ...defFieldPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefFieldComponent,
        DefFieldDetailComponent,
        DefFieldUpdateComponent,
        DefFieldDeleteDialogComponent,
        DefFieldDeletePopupComponent
    ],
    entryComponents: [DefFieldComponent, DefFieldUpdateComponent, DefFieldDeleteDialogComponent, DefFieldDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefFieldModule {}
