import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from './fiscal-period.service';
import { FiscalPeriodComponent } from './fiscal-period.component';
import { FiscalPeriodDetailComponent } from './fiscal-period-detail.component';
import { FiscalPeriodUpdateComponent } from './fiscal-period-update.component';
import { FiscalPeriodDeletePopupComponent } from './fiscal-period-delete-dialog.component';
import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';

@Injectable({ providedIn: 'root' })
export class FiscalPeriodResolve implements Resolve<IFiscalPeriod> {
    constructor(private service: FiscalPeriodService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fiscalPeriod: HttpResponse<FiscalPeriod>) => fiscalPeriod.body));
        }
        return of(new FiscalPeriod());
    }
}

export const fiscalPeriodRoute: Routes = [
    {
        path: 'fiscal-period',
        component: FiscalPeriodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-period/:id/view',
        component: FiscalPeriodDetailComponent,
        resolve: {
            fiscalPeriod: FiscalPeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-period/new',
        component: FiscalPeriodUpdateComponent,
        resolve: {
            fiscalPeriod: FiscalPeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-period/:id/edit',
        component: FiscalPeriodUpdateComponent,
        resolve: {
            fiscalPeriod: FiscalPeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fiscalPeriodPopupRoute: Routes = [
    {
        path: 'fiscal-period/:id/delete',
        component: FiscalPeriodDeletePopupComponent,
        resolve: {
            fiscalPeriod: FiscalPeriodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
