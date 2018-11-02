import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerSubmit } from 'app/shared/model/per-submit.model';
import { PerSchedulerService } from './per-scheduler.service';
import { PerSchedulerComponent } from './per-scheduler.component';
import { IPerSubmit } from 'app/shared/model/per-submit.model';

@Injectable({ providedIn: 'root' })
export class PerSchedulerResolve implements Resolve<IPerSubmit> {
    constructor(private service: PerSchedulerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perSubmit: HttpResponse<PerSubmit>) => perSubmit.body));
        }
        return of(new PerSubmit());
    }
}

export const perSchedulerRoute: Routes = [
    {
        path: 'per-scheduler',
        component: PerSchedulerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.perSubmit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perSchedulerPopupRoute: Routes = [];
