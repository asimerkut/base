import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FinSharedModule} from '../../shared';
import {
    PerSubmitComponent,
    PerSubmitDeleteDialogComponent,
    PerSubmitDeletePopupComponent,
    PerSubmitDetailComponent,
    PerSubmitDialogComponent,
    PerSubmitPopupComponent,
    perSubmitPopupRoute,
    PerSubmitPopupService,
    perSubmitRoute,
    PerSubmitService,
} from './';
import {ScheduleModule} from 'primeng/components/schedule/schedule';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

const ENTITY_STATES = [
    ...perSubmitRoute,
    ...perSubmitPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES),

        ScheduleModule,
        DialogModule,
        ButtonModule
    ],
    declarations: [
        PerSubmitComponent,
        PerSubmitDetailComponent,
        PerSubmitDialogComponent,
        PerSubmitDeleteDialogComponent,
        PerSubmitPopupComponent,
        PerSubmitDeletePopupComponent,
    ],
    entryComponents: [
        PerSubmitComponent,
        PerSubmitDialogComponent,
        PerSubmitPopupComponent,
        PerSubmitDeleteDialogComponent,
        PerSubmitDeletePopupComponent,
    ],
    providers: [
        PerSubmitService,
        PerSubmitPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinPerSubmitModule {
}
