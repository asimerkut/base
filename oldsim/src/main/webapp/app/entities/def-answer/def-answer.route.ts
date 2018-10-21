import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {DefAnswerComponent} from './def-answer.component';
import {DefAnswerItemsourceComponent} from './def-answer-itemsource.component';
import {DefAnswerDetailComponent} from './def-answer-detail.component';
import {DefAnswerPopupComponent} from './def-answer-dialog.component';
import {DefAnswerDeletePopupComponent} from './def-answer-delete-dialog.component';

export const defAnswerRoute: Routes = [
    {
        path: 'def-answer',
        component: DefAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'def-answer-itemsource/:id/:typeId/:typeCode',
        component: DefAnswerItemsourceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswerItemsource'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'def-answer/:id',
        component: DefAnswerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defAnswerPopupRoute: Routes = [
    {
        path: 'def-answer-new',
        component: DefAnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'def-answer-new/:typeId/:typeCode/:itemId',
        component: DefAnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefRelations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'def-answer/:id/edit',
        component: DefAnswerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'def-answer/:id/delete',
        component: DefAnswerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DefAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
