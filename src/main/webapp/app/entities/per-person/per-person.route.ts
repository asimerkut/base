import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from './per-person.service';
import { PerPersonComponent } from './per-person.component';
import { PerPersonDetailComponent } from './per-person-detail.component';
import { PerPersonUpdateComponent } from './per-person-update.component';
import { PerPersonDeletePopupComponent } from './per-person-delete-dialog.component';
import { IPerPerson } from 'app/shared/model/per-person.model';

@Injectable({ providedIn: 'root' })
export class PerPersonResolve implements Resolve<IPerPerson> {
    constructor(private service: PerPersonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perPerson: HttpResponse<PerPerson>) => perPerson.body));
        }
        return of(new PerPerson());
    }
}

export const perPersonRoute: Routes = [
    {
        path: 'per-person',
        component: PerPersonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-person/:id/view',
        component: PerPersonDetailComponent,
        resolve: {
            perPerson: PerPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-person/new',
        component: PerPersonUpdateComponent,
        resolve: {
            perPerson: PerPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'per-person/:id/edit',
        component: PerPersonUpdateComponent,
        resolve: {
            perPerson: PerPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPerson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perPersonPopupRoute: Routes = [
    {
        path: 'per-person/:id/delete',
        component: PerPersonDeletePopupComponent,
        resolve: {
            perPerson: PerPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perPerson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
