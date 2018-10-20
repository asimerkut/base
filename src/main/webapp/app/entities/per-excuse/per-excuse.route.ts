import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerExcuse } from 'app/shared/model/per-excuse.model';
import { PerExcuseService } from './per-excuse.service';
import { PerExcuseComponent } from './per-excuse.component';
import { PerExcuseDetailComponent } from './per-excuse-detail.component';
import { PerExcuseUpdateComponent } from './per-excuse-update.component';
import { PerExcuseDeletePopupComponent } from './per-excuse-delete-dialog.component';
import { IPerExcuse } from 'app/shared/model/per-excuse.model';

@Injectable({ providedIn: 'root' })
export class PerExcuseResolve implements Resolve<IPerExcuse> {
    constructor(private service: PerExcuseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perExcuse: HttpResponse<PerExcuse>) => perExcuse.body));
        }
        return of(new PerExcuse());
    }
}

export const perExcuseRoute: Routes = [
    {
        path: 'per-excuse',
        component: PerExcuseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perExcuse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-excuse/:id/view',
        component: PerExcuseDetailComponent,
        resolve: {
            perExcuse: PerExcuseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perExcuse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-excuse/new',
        component: PerExcuseUpdateComponent,
        resolve: {
            perExcuse: PerExcuseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perExcuse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-excuse/:id/edit',
        component: PerExcuseUpdateComponent,
        resolve: {
            perExcuse: PerExcuseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perExcuse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perExcusePopupRoute: Routes = [
    {
        path: 'per-excuse/:id/delete',
        component: PerExcuseDeletePopupComponent,
        resolve: {
            perExcuse: PerExcuseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perExcuse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
