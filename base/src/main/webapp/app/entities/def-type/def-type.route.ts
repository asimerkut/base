import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefType } from 'app/shared/model/def-type.model';
import { DefTypeService } from './def-type.service';
import { DefTypeComponent } from './def-type.component';
import { DefTypeDetailComponent } from './def-type-detail.component';
import { DefTypeUpdateComponent } from './def-type-update.component';
import { DefTypeDeletePopupComponent } from './def-type-delete-dialog.component';
import { IDefType } from 'app/shared/model/def-type.model';

@Injectable({ providedIn: 'root' })
export class DefTypeResolve implements Resolve<IDefType> {
    constructor(private service: DefTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defType: HttpResponse<DefType>) => defType.body));
        }
        return of(new DefType());
    }
}

export const defTypeRoute: Routes = [
    {
        path: 'def-type',
        component: DefTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-type/:id/view',
        component: DefTypeDetailComponent,
        resolve: {
            defType: DefTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-type/new',
        component: DefTypeUpdateComponent,
        resolve: {
            defType: DefTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-type/:id/edit',
        component: DefTypeUpdateComponent,
        resolve: {
            defType: DefTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defTypePopupRoute: Routes = [
    {
        path: 'def-type/:id/delete',
        component: DefTypeDeletePopupComponent,
        resolve: {
            defType: DefTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
