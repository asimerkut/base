import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PerDailyComponent} from './per-daily.component';
import {PerDailyDetailComponent} from './per-daily-detail.component';
import {PerDailyPopupComponent} from './per-daily-dialog.component';
import {PerDailyDeletePopupComponent} from './per-daily-delete-dialog.component';

export const perDailyRoute: Routes = [
    {
        path: 'per-daily',
        component: PerDailyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PerDailies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'per-daily/:id',
        component: PerDailyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PerDailies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perDailyPopupRoute: Routes = [
    {
        path: 'per-daily-new',
        component: PerDailyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PerDailies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'per-daily/:id/edit',
        component: PerDailyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PerDailies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'per-daily/:id/delete',
        component: PerDailyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PerDailies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
