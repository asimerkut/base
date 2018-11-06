import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    PerValueComponent,
    PerValueDetailComponent,
    PerValueUpdateComponent,
    PerValueDeletePopupComponent,
    PerValueDeleteDialogComponent,
    perValueRoute,
    perValuePopupRoute
} from './';

const ENTITY_STATES = [...perValueRoute, ...perValuePopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerValueComponent,
        PerValueDetailComponent,
        PerValueUpdateComponent,
        PerValueDeleteDialogComponent,
        PerValueDeletePopupComponent
    ],
    entryComponents: [PerValueComponent, PerValueUpdateComponent, PerValueDeleteDialogComponent, PerValueDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerValueModule {}
