import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/components/treetable/treetable';
import {ButtonModule} from 'primeng/components/button/button';
import {ContextMenuModule} from 'primeng/components/contextmenu/contextmenu';
import {GrowlModule} from 'primeng/components/growl/growl';

import {FinSharedModule} from '../../shared';
import {
    DefItemComponent,
    DefItemDeleteDialogComponent,
    DefItemDeletePopupComponent,
    DefItemDetailComponent,
    DefItemDialogComponent,
    DefItemPopupComponent,
    defItemPopupRoute,
    DefItemPopupService,
    defItemRoute,
    DefItemService,
} from './';

const ENTITY_STATES = [
    ...defItemRoute,
    ...defItemPopupRoute,
];

@NgModule({
    imports: [
        FinSharedModule,
        BrowserModule,
        FormsModule,
        TreeTableModule,
        ButtonModule,
        ContextMenuModule,
        GrowlModule,

        FinSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefItemComponent,
        DefItemDetailComponent,
        DefItemDialogComponent,
        DefItemDeleteDialogComponent,
        DefItemPopupComponent,
        DefItemDeletePopupComponent,
    ],
    entryComponents: [
        DefItemComponent,
        DefItemDialogComponent,
        DefItemPopupComponent,
        DefItemDeleteDialogComponent,
        DefItemDeletePopupComponent,
    ],
    providers: [
        DefItemService,
        DefItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinDefItemModule {
}
