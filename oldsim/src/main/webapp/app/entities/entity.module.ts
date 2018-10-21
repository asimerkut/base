import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {FinDefPivotModule} from './def-pivot/def-pivot.module';
import {FinDefTypeModule} from './def-type/def-type.module';
import {FinDefItemModule} from './def-item/def-item.module';
import {FinDefRelationModule} from './def-relation/def-relation.module';
import {FinDefAnswerModule} from './def-answer/def-answer.module';
import {FinPerCompanyModule} from './per-company/per-company.module';
import {FinPerPersonModule} from './per-person/per-person.module';
import {FinPerPlanModule} from './per-plan/per-plan.module';
import {FinPerExcuseModule} from './per-excuse/per-excuse.module';
import {FinPerSubmitModule} from './per-submit/per-submit.module';
import {FinPerDailyModule} from './per-daily/per-daily.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FinDefPivotModule,
        FinDefTypeModule,
        FinDefItemModule,
        FinDefRelationModule,
        FinDefAnswerModule,
        FinPerCompanyModule,
        FinPerPersonModule,
        FinPerPlanModule,
        FinPerExcuseModule,
        FinPerSubmitModule,
        FinPerDailyModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
        BrowserAnimationsModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinEntityModule {
}
