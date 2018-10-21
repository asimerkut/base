import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerCompany } from 'app/shared/model/per-company.model';
import { PerCompanyService } from './per-company.service';
import { PerCompanyComponent } from './per-company.component';
import { PerCompanyDetailComponent } from './per-company-detail.component';
import { PerCompanyUpdateComponent } from './per-company-update.component';
import { PerCompanyDeletePopupComponent } from './per-company-delete-dialog.component';
import { IPerCompany } from 'app/shared/model/per-company.model';

@Injectable({ providedIn: 'root' })
export class PerCompanyResolve implements Resolve<IPerCompany> {
    constructor(private service: PerCompanyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perCompany: HttpResponse<PerCompany>) => perCompany.body));
        }
        return of(new PerCompany());
    }
}

export const perCompanyRoute: Routes = [
    {
        path: 'per-company',
        component: PerCompanyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perCompany.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-company/:id/view',
        component: PerCompanyDetailComponent,
        resolve: {
            perCompany: PerCompanyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perCompany.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-company/new',
        component: PerCompanyUpdateComponent,
        resolve: {
            perCompany: PerCompanyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perCompany.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-company/:id/edit',
        component: PerCompanyUpdateComponent,
        resolve: {
            perCompany: PerCompanyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perCompany.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perCompanyPopupRoute: Routes = [
    {
        path: 'per-company/:id/delete',
        component: PerCompanyDeletePopupComponent,
        resolve: {
            perCompany: PerCompanyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perCompany.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
