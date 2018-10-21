import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerDaily } from 'app/shared/model/per-daily.model';
import { PerDailyService } from './per-daily.service';
import { PerDailyComponent } from './per-daily.component';
import { PerDailyDetailComponent } from './per-daily-detail.component';
import { PerDailyUpdateComponent } from './per-daily-update.component';
import { PerDailyDeletePopupComponent } from './per-daily-delete-dialog.component';
import { IPerDaily } from 'app/shared/model/per-daily.model';

@Injectable({ providedIn: 'root' })
export class PerDailyResolve implements Resolve<IPerDaily> {
    constructor(private service: PerDailyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perDaily: HttpResponse<PerDaily>) => perDaily.body));
        }
        return of(new PerDaily());
    }
}

export const perDailyRoute: Routes = [
    {
        path: 'per-daily',
        component: PerDailyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perDaily.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-daily/:id/view',
        component: PerDailyDetailComponent,
        resolve: {
            perDaily: PerDailyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perDaily.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-daily/new',
        component: PerDailyUpdateComponent,
        resolve: {
            perDaily: PerDailyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perDaily.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-daily/:id/edit',
        component: PerDailyUpdateComponent,
        resolve: {
            perDaily: PerDailyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perDaily.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perDailyPopupRoute: Routes = [
    {
        path: 'per-daily/:id/delete',
        component: PerDailyDeletePopupComponent,
        resolve: {
            perDaily: PerDailyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perDaily.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
