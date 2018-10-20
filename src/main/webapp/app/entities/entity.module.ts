import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BaseDefPivotModule } from './def-pivot/def-pivot.module';
import { BaseFiscalYearModule } from './fiscal-year/fiscal-year.module';
import { BaseDefTypeModule } from './def-type/def-type.module';
import { BaseDefItemModule } from './def-item/def-item.module';
import { BaseDefRelationModule } from './def-relation/def-relation.module';
import { BaseDefAnswerModule } from './def-answer/def-answer.module';
import { BasePerCompanyModule } from './per-company/per-company.module';
import { BasePerPersonModule } from './per-person/per-person.module';
import { BaseFiscalPeriodModule } from './fiscal-period/fiscal-period.module';
import { BasePerPlanModule } from './per-plan/per-plan.module';
import { BasePerExcuseModule } from './per-excuse/per-excuse.module';
import { BasePerSubmitModule } from './per-submit/per-submit.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BaseDefPivotModule,
        BaseFiscalYearModule,
        BaseDefTypeModule,
        BaseDefItemModule,
        BaseDefRelationModule,
        BaseDefAnswerModule,
        BasePerCompanyModule,
        BasePerPersonModule,
        BaseFiscalPeriodModule,
        BasePerPlanModule,
        BasePerExcuseModule,
        BasePerSubmitModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseEntityModule {}
