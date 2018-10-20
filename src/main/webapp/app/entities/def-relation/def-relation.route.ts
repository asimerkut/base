import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefRelation } from 'app/shared/model/def-relation.model';
import { DefRelationService } from './def-relation.service';
import { DefRelationComponent } from './def-relation.component';
import { DefRelationDetailComponent } from './def-relation-detail.component';
import { DefRelationUpdateComponent } from './def-relation-update.component';
import { DefRelationDeletePopupComponent } from './def-relation-delete-dialog.component';
import { IDefRelation } from 'app/shared/model/def-relation.model';

@Injectable({ providedIn: 'root' })
export class DefRelationResolve implements Resolve<IDefRelation> {
    constructor(private service: DefRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defRelation: HttpResponse<DefRelation>) => defRelation.body));
        }
        return of(new DefRelation());
    }
}

export const defRelationRoute: Routes = [
    {
        path: 'def-relation',
        component: DefRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-relation/:id/view',
        component: DefRelationDetailComponent,
        resolve: {
            defRelation: DefRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-relation/new',
        component: DefRelationUpdateComponent,
        resolve: {
            defRelation: DefRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-relation/:id/edit',
        component: DefRelationUpdateComponent,
        resolve: {
            defRelation: DefRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defRelationPopupRoute: Routes = [
    {
        path: 'def-relation/:id/delete',
        component: DefRelationDeletePopupComponent,
        resolve: {
            defRelation: DefRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
