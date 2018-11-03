import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';
import { FiscalDayoffService } from './fiscal-dayoff.service';
import { FiscalDayoffComponent } from './fiscal-dayoff.component';
import { FiscalDayoffDetailComponent } from './fiscal-dayoff-detail.component';
import { FiscalDayoffUpdateComponent } from './fiscal-dayoff-update.component';
import { FiscalDayoffDeletePopupComponent } from './fiscal-dayoff-delete-dialog.component';
import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

@Injectable({ providedIn: 'root' })
export class FiscalDayoffResolve implements Resolve<IFiscalDayoff> {
    constructor(private service: FiscalDayoffService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fiscalDayoff: HttpResponse<FiscalDayoff>) => fiscalDayoff.body));
        }
        return of(new FiscalDayoff());
    }
}

export const fiscalDayoffRoute: Routes = [
    {
        path: 'fiscal-dayoff',
        component: FiscalDayoffComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalDayoff.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-dayoff/:id/view',
        component: FiscalDayoffDetailComponent,
        resolve: {
            fiscalDayoff: FiscalDayoffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalDayoff.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-dayoff/new',
        component: FiscalDayoffUpdateComponent,
        resolve: {
            fiscalDayoff: FiscalDayoffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalDayoff.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fiscal-dayoff/:id/edit',
        component: FiscalDayoffUpdateComponent,
        resolve: {
            fiscalDayoff: FiscalDayoffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalDayoff.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fiscalDayoffPopupRoute: Routes = [
    {
        path: 'fiscal-dayoff/:id/delete',
        component: FiscalDayoffDeletePopupComponent,
        resolve: {
            fiscalDayoff: FiscalDayoffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.fiscalDayoff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
