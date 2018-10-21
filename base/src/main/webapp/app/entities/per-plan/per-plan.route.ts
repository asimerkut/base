import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerPlan } from 'app/shared/model/per-plan.model';
import { PerPlanService } from './per-plan.service';
import { PerPlanComponent } from './per-plan.component';
import { PerPlanDetailComponent } from './per-plan-detail.component';
import { PerPlanUpdateComponent } from './per-plan-update.component';
import { PerPlanDeletePopupComponent } from './per-plan-delete-dialog.component';
import { IPerPlan } from 'app/shared/model/per-plan.model';

@Injectable({ providedIn: 'root' })
export class PerPlanResolve implements Resolve<IPerPlan> {
    constructor(private service: PerPlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perPlan: HttpResponse<PerPlan>) => perPlan.body));
        }
        return of(new PerPlan());
    }
}

export const perPlanRoute: Routes = [
    {
        path: 'per-plan',
        component: PerPlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPlan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-plan/:id/view',
        component: PerPlanDetailComponent,
        resolve: {
            perPlan: PerPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPlan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-plan/new',
        component: PerPlanUpdateComponent,
        resolve: {
            perPlan: PerPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPlan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-plan/:id/edit',
        component: PerPlanUpdateComponent,
        resolve: {
            perPlan: PerPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPlan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perPlanPopupRoute: Routes = [
    {
        path: 'per-plan/:id/delete',
        component: PerPlanDeletePopupComponent,
        resolve: {
            perPlan: PerPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPlan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
