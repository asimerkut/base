import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefPivot } from 'app/shared/model/def-pivot.model';
import { DefPivotService } from './def-pivot.service';
import { DefPivotComponent } from './def-pivot.component';
import { DefPivotDetailComponent } from './def-pivot-detail.component';
import { DefPivotUpdateComponent } from './def-pivot-update.component';
import { DefPivotDeletePopupComponent } from './def-pivot-delete-dialog.component';
import { IDefPivot } from 'app/shared/model/def-pivot.model';

@Injectable({ providedIn: 'root' })
export class DefPivotResolve implements Resolve<IDefPivot> {
    constructor(private service: DefPivotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defPivot: HttpResponse<DefPivot>) => defPivot.body));
        }
        return of(new DefPivot());
    }
}

export const defPivotRoute: Routes = [
    {
        path: 'def-pivot',
        component: DefPivotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defPivot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-pivot/:id/view',
        component: DefPivotDetailComponent,
        resolve: {
            defPivot: DefPivotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defPivot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-pivot/new',
        component: DefPivotUpdateComponent,
        resolve: {
            defPivot: DefPivotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defPivot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-pivot/:id/edit',
        component: DefPivotUpdateComponent,
        resolve: {
            defPivot: DefPivotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defPivot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defPivotPopupRoute: Routes = [
    {
        path: 'def-pivot/:id/delete',
        component: DefPivotDeletePopupComponent,
        resolve: {
            defPivot: DefPivotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defPivot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
