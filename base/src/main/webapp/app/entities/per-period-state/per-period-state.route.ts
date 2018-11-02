import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerPeriodState } from 'app/shared/model/per-period-state.model';
import { PerPeriodStateService } from './per-period-state.service';
import { PerPeriodStateComponent } from './per-period-state.component';
import { PerPeriodStateDetailComponent } from './per-period-state-detail.component';
import { PerPeriodStateUpdateComponent } from './per-period-state-update.component';
import { PerPeriodStateDeletePopupComponent } from './per-period-state-delete-dialog.component';
import { IPerPeriodState } from 'app/shared/model/per-period-state.model';

@Injectable({ providedIn: 'root' })
export class PerPeriodStateResolve implements Resolve<IPerPeriodState> {
    constructor(private service: PerPeriodStateService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perPeriodState: HttpResponse<PerPeriodState>) => perPeriodState.body));
        }
        return of(new PerPeriodState());
    }
}

export const perPeriodStateRoute: Routes = [
    {
        path: 'per-period-state',
        component: PerPeriodStateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPeriodState.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-period-state/:id/view',
        component: PerPeriodStateDetailComponent,
        resolve: {
            perPeriodState: PerPeriodStateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPeriodState.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-period-state/new',
        component: PerPeriodStateUpdateComponent,
        resolve: {
            perPeriodState: PerPeriodStateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPeriodState.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-period-state/:id/edit',
        component: PerPeriodStateUpdateComponent,
        resolve: {
            perPeriodState: PerPeriodStateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPeriodState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perPeriodStatePopupRoute: Routes = [
    {
        path: 'per-period-state/:id/delete',
        component: PerPeriodStateDeletePopupComponent,
        resolve: {
            perPeriodState: PerPeriodStateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPeriodState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
