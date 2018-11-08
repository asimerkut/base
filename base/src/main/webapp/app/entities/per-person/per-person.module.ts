import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseSharedModule } from 'app/shared';
import { BaseAdminModule } from 'app/admin/admin.module';
import {
    PerPersonComponent,
    PerPersonDetailComponent,
    PerPersonUpdateComponent,
    PerPersonDeletePopupComponent,
    PerPersonDeleteDialogComponent,
    perPersonRoute,
    perPersonPopupRoute
} from './';
import { TableModule } from 'primeng/components/table/table';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ButtonModule } from 'primeng/components/button/button';

// import { ObjectUtils } from 'primeng/components/utils/objectutils';

const ENTITY_STATES = [...perPersonRoute, ...perPersonPopupRoute];

@NgModule({
    imports: [BaseSharedModule, BaseAdminModule, TableModule, DialogModule, ButtonModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerPersonComponent,
        PerPersonDetailComponent,
        PerPersonUpdateComponent,
        PerPersonDeleteDialogComponent,
        PerPersonDeletePopupComponent
    ],
    entryComponents: [PerPersonComponent, PerPersonUpdateComponent, PerPersonDeleteDialogComponent, PerPersonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasePerPersonModule {}
