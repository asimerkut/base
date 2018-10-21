import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefAnswer } from 'app/shared/model/def-answer.model';
import { DefAnswerService } from './def-answer.service';
import { DefAnswerComponent } from './def-answer.component';
import { DefAnswerDetailComponent } from './def-answer-detail.component';
import { DefAnswerUpdateComponent } from './def-answer-update.component';
import { DefAnswerDeletePopupComponent } from './def-answer-delete-dialog.component';
import { IDefAnswer } from 'app/shared/model/def-answer.model';

@Injectable({ providedIn: 'root' })
export class DefAnswerResolve implements Resolve<IDefAnswer> {
    constructor(private service: DefAnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defAnswer: HttpResponse<DefAnswer>) => defAnswer.body));
        }
        return of(new DefAnswer());
    }
}

export const defAnswerRoute: Routes = [
    {
        path: 'def-answer',
        component: DefAnswerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-answer/:id/view',
        component: DefAnswerDetailComponent,
        resolve: {
            defAnswer: DefAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-answer/new',
        component: DefAnswerUpdateComponent,
        resolve: {
            defAnswer: DefAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-answer/:id/edit',
        component: DefAnswerUpdateComponent,
        resolve: {
            defAnswer: DefAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defAnswer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defAnswerPopupRoute: Routes = [
    {
        path: 'def-answer/:id/delete',
        component: DefAnswerDeletePopupComponent,
        resolve: {
            defAnswer: DefAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defAnswer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
