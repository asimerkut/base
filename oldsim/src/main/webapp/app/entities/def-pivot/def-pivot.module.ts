import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    DefPivotComponent,
    DefPivotDeleteDialogComponent,
    DefPivotDeletePopupComponent,
    DefPivotDetailComponent,
    DefPivotDialogComponent,
    DefPivotPopupComponent,
    defPivotPopupRoute,
    DefPivotPopupService,
    defPivotRoute,
    DefPivotService,
} from './';

const ENTITY_STATES = [
    ...defPivotRoute,
    ...defPivotPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefPivotComponent,
        DefPivotDetailComponent,
        DefPivotDialogComponent,
        DefPivotDeleteDialogComponent,
        DefPivotPopupComponent,
        DefPivotDeletePopupComponent,
    ],
    entryComponents: [
        DefPivotComponent,
        DefPivotDialogComponent,
        DefPivotPopupComponent,
        DefPivotDeleteDialogComponent,
        DefPivotDeletePopupComponent,
    ],
    providers: [
        DefPivotService,
        DefPivotPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinDefPivotModule {
}
