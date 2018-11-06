import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerValue } from 'app/shared/model/per-value.model';
import { PerValueService } from './per-value.service';
import { PerValueComponent } from './per-value.component';
import { PerValueDetailComponent } from './per-value-detail.component';
import { PerValueUpdateComponent } from './per-value-update.component';
import { PerValueDeletePopupComponent } from './per-value-delete-dialog.component';
import { IPerValue } from 'app/shared/model/per-value.model';

@Injectable({ providedIn: 'root' })
export class PerValueResolve implements Resolve<IPerValue> {
    constructor(private service: PerValueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perValue: HttpResponse<PerValue>) => perValue.body));
        }
        return of(new PerValue());
    }
}

export const perValueRoute: Routes = [
    {
        path: 'per-value',
        component: PerValueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-value/:id/view',
        component: PerValueDetailComponent,
        resolve: {
            perValue: PerValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-value/new',
        component: PerValueUpdateComponent,
        resolve: {
            perValue: PerValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-value/:id/edit',
        component: PerValueUpdateComponent,
        resolve: {
            perValue: PerValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perValuePopupRoute: Routes = [
    {
        path: 'per-value/:id/delete',
        component: PerValueDeletePopupComponent,
        resolve: {
            perValue: PerValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
