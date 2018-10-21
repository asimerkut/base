import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiscalYear } from 'app/shared/model/fiscal-year.model';
import { FiscalYearService } from './fiscal-year.service';
import { FiscalYearComponent } from './fiscal-year.component';
import { FiscalYearDetailComponent } from './fiscal-year-detail.component';
import { FiscalYearUpdateComponent } from './fiscal-year-update.component';
import { FiscalYearDeletePopupComponent } from './fiscal-year-delete-dialog.component';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';

@Injectable({ providedIn: 'root' })
export class FiscalYearResolve implements Resolve<IFiscalYear> {
    constructor(private service: FiscalYearService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fiscalYear: HttpResponse<FiscalYear>) => fiscalYear.body));
        }
        return of(new FiscalYear());
    }
}

export const fiscalYearRoute: Routes = [
    {
        path: 'fiscal-year',
        component: FiscalYearComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-year/:id/view',
        component: FiscalYearDetailComponent,
        resolve: {
            fiscalYear: FiscalYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-year/new',
        component: FiscalYearUpdateComponent,
        resolve: {
            fiscalYear: FiscalYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-year/:id/edit',
        component: FiscalYearUpdateComponent,
        resolve: {
            fiscalYear: FiscalYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fiscalYearPopupRoute: Routes = [
    {
        path: 'fiscal-year/:id/delete',
        component: FiscalYearDeletePopupComponent,
        resolve: {
            fiscalYear: FiscalYearResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
