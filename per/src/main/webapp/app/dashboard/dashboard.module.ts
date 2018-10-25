import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseBarchartModule } from './barchart/barchart.module';
import { BaseDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { BaseLinechartModule } from './linechart/linechart.module';
import { BasePiechartModule } from './piechart/piechart.module';
import { BasePolarareachartModule } from './polarareachart/polarareachart.module';
import { BaseRadarchartModule } from './radarchart/radarchart.module';
import { BaseScheduleModule } from './schedule/schedule.module';

@NgModule({
    imports: [
        BaseBarchartModule,
        BaseDoughnutchartModule,
        BaseLinechartModule,
        BasePiechartModule,
        BasePolarareachartModule,
        BaseRadarchartModule,
        BaseScheduleModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaseDashboardModule {}
