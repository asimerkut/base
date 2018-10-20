import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import { BaseAdminModule } from 'app/admin/admin.module';
import {
    PerPersonComponent,
    PerPersonDetailComponent,
    PerPersonUpdateComponent,
    PerPersonDeletePopupComponent,
    PerPersonDeleteDialogComponent,
    perPersonRoute,
    perPersonPopupRoute
} from './';

const ENTITY_STATES = [...perPersonRoute, ...perPersonPopupRoute];

@NgModule({
    imports: [BaseSharedModule, BaseAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerPersonComponent,
        PerPersonDetailComponent,
        PerPersonUpdateComponent,
        PerPersonDeleteDialogComponent,
        PerPersonDeletePopupComponent
    ],
    entryComponents: [PerPersonComponent, PerPersonUpdateComponent, PerPersonDeleteDialogComponent, PerPersonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerPersonModule {}
