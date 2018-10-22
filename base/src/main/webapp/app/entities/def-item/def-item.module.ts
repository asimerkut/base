import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeTableModule } from 'primeng/components/treetable/treetable';

import { BaseSharedModule } from 'app/shared';
import {
    DefItemComponent,
    DefItemDetailComponent,
    DefItemUpdateComponent,
    DefItemDeletePopupComponent,
    DefItemDeleteDialogComponent,
    defItemRoute,
    defItemPopupRoute
} from './';

const ENTITY_STATES = [...defItemRoute, ...defItemPopupRoute];

@NgModule({
    imports: [TreeTableModule, BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefItemComponent,
        DefItemDetailComponent,
        DefItemUpdateComponent,
        DefItemDeleteDialogComponent,
        DefItemDeletePopupComponent
    ],
    entryComponents: [DefItemComponent, DefItemUpdateComponent, DefItemDeleteDialogComponent, DefItemDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefItemModule {}
