import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerSubmit } from 'app/shared/model/per-submit.model';
import { PerSubmitService } from './per-submit.service';
import { PerSubmitComponent } from './per-submit.component';
import { PerSubmitDetailComponent } from './per-submit-detail.component';
import { PerSubmitUpdateComponent } from './per-submit-update.component';
import { PerSubmitDeletePopupComponent } from './per-submit-delete-dialog.component';
import { IPerSubmit } from 'app/shared/model/per-submit.model';

@Injectable({ providedIn: 'root' })
export class PerSubmitResolve implements Resolve<IPerSubmit> {
    constructor(private service: PerSubmitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perSubmit: HttpResponse<PerSubmit>) => perSubmit.body));
        }
        return of(new PerSubmit());
    }
}

export const perSubmitRoute: Routes = [
    {
        path: 'per-submit',
        component: PerSubmitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-submit/:id/view',
        component: PerSubmitDetailComponent,
        resolve: {
            perSubmit: PerSubmitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-submit/new',
        component: PerSubmitUpdateComponent,
        resolve: {
            perSubmit: PerSubmitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-submit/:id/edit',
        component: PerSubmitUpdateComponent,
        resolve: {
            perSubmit: PerSubmitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perSubmitPopupRoute: Routes = [
    {
        path: 'per-submit/:id/delete',
        component: PerSubmitDeletePopupComponent,
        resolve: {
            perSubmit: PerSubmitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
