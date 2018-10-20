import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import { PerSubmitComponent, perSubmitRoute, perSubmitPopupRoute } from './';

const ENTITY_STATES = [...perSubmitRoute, ...perSubmitPopupRoute];

@NgModule({
    imports: [BaseSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PerSubmitComponent],
    entryComponents: [PerSubmitComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerSubmitModule {}
