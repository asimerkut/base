import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    PerExcuseComponent,
    PerExcuseDeleteDialogComponent,
    PerExcuseDeletePopupComponent,
    PerExcuseDetailComponent,
    PerExcuseDialogComponent,
    PerExcusePopupComponent,
    perExcusePopupRoute,
    PerExcusePopupService,
    perExcuseRoute,
    PerExcuseService,
} from './';

const ENTITY_STATES = [
    ...perExcuseRoute,
    ...perExcusePopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerExcuseComponent,
        PerExcuseDetailComponent,
        PerExcuseDialogComponent,
        PerExcuseDeleteDialogComponent,
        PerExcusePopupComponent,
        PerExcuseDeletePopupComponent,
    ],
    entryComponents: [
        PerExcuseComponent,
        PerExcuseDialogComponent,
        PerExcusePopupComponent,
        PerExcuseDeleteDialogComponent,
        PerExcuseDeletePopupComponent,
    ],
    providers: [
        PerExcuseService,
        PerExcusePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinPerExcuseModule {
}
