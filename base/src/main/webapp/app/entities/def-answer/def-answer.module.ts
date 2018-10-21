import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import {
    DefAnswerComponent,
    DefAnswerDetailComponent,
    DefAnswerUpdateComponent,
    DefAnswerDeletePopupComponent,
    DefAnswerDeleteDialogComponent,
    defAnswerRoute,
    defAnswerPopupRoute
} from './';

const ENTITY_STATES = [...defAnswerRoute, ...defAnswerPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefAnswerComponent,
        DefAnswerDetailComponent,
        DefAnswerUpdateComponent,
        DefAnswerDeleteDialogComponent,
        DefAnswerDeletePopupComponent
    ],
    entryComponents: [DefAnswerComponent, DefAnswerUpdateComponent, DefAnswerDeleteDialogComponent, DefAnswerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDefAnswerModule {}
