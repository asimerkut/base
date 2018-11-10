import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefField } from 'app/shared/model/def-field.model';
import { DefFieldService } from './def-field.service';
import { DefFieldComponent } from './def-field.component';
import { DefFieldDetailComponent } from './def-field-detail.component';
import { DefFieldUpdateComponent } from './def-field-update.component';
import { DefFieldDeletePopupComponent } from './def-field-delete-dialog.component';
import { IDefField } from 'app/shared/model/def-field.model';

@Injectable({ providedIn: 'root' })
export class DefFieldResolve implements Resolve<IDefField> {
    constructor(private service: DefFieldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defField: HttpResponse<DefField>) => defField.body));
        }
        return of(new DefField());
    }
}

export const defFieldRoute: Routes = [
    {
        path: 'def-field',
        component: DefFieldComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defField.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-field/:id/view',
        component: DefFieldDetailComponent,
        resolve: {
            defField: DefFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defField.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-field/new',
        component: DefFieldUpdateComponent,
        resolve: {
            defField: DefFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defField.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-field/:id/edit',
        component: DefFieldUpdateComponent,
        resolve: {
            defField: DefFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defField.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defFieldPopupRoute: Routes = [
    {
        path: 'def-field/:id/delete',
        component: DefFieldDeletePopupComponent,
        resolve: {
            defField: DefFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defField.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
