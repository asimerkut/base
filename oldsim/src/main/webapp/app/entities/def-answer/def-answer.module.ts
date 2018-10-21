import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    DefAnswerComponent,
    DefAnswerDeleteDialogComponent,
    DefAnswerDeletePopupComponent,
    DefAnswerDetailComponent,
    DefAnswerDialogComponent,
    DefAnswerItemsourceComponent,
    DefAnswerPopupComponent,
    defAnswerPopupRoute,
    DefAnswerPopupService,
    defAnswerRoute,
    DefAnswerService,
} from './';

const ENTITY_STATES = [
    ...defAnswerRoute,
    ...defAnswerPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefAnswerComponent,
        DefAnswerItemsourceComponent,
        DefAnswerDetailComponent,
        DefAnswerDialogComponent,
        DefAnswerDeleteDialogComponent,
        DefAnswerPopupComponent,
        DefAnswerDeletePopupComponent,
    ],
    entryComponents: [
        DefAnswerComponent,
        DefAnswerDialogComponent,
        DefAnswerPopupComponent,
        DefAnswerDeleteDialogComponent,
        DefAnswerDeletePopupComponent,
    ],
    providers: [
        DefAnswerService,
        DefAnswerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinDefAnswerModule {
}
