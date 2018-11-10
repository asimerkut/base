import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from './def-item.service';
import { DefItemComponent } from './def-item.component';
import { DefItemDetailComponent } from './def-item-detail.component';
import { DefItemUpdateComponent } from './def-item-update.component';
import { DefItemDeletePopupComponent } from './def-item-delete-dialog.component';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefType } from 'app/shared/model/def-type.model';

@Injectable({ providedIn: 'root' })
export class DefItemResolve implements Resolve<IDefItem> {
    constructor(private service: DefItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defItem: HttpResponse<DefItem>) => defItem.body));
        }
        const type = route.params['type'] ? route.params['type'] : null;
        if (type) {
            const newType = new DefType();
            newType.code = type;
            const newItem = new DefItem();
            newItem.type = newType;
            return newItem;
        }
        return of(new DefItem());
    }
}

export const defItemRoute: Routes = [
    {
        path: 'def-item',
        component: DefItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-item/:id/view',
        component: DefItemDetailComponent,
        resolve: {
            defItem: DefItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-item/:type/new',
        component: DefItemUpdateComponent,
        resolve: {
            defItem: DefItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'def-item/:id/edit',
        component: DefItemUpdateComponent,
        resolve: {
            defItem: DefItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defItemPopupRoute: Routes = [
    {
        path: 'def-item/:id/delete',
        component: DefItemDeletePopupComponent,
        resolve: {
            defItem: DefItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'baseApp.defItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
