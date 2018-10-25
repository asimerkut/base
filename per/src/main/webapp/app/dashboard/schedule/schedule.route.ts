import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../core';
import { ScheduleComponent } from './schedule.component';

export const scheduleRoute: Route = {
    path: 'schedule',
    component: ScheduleComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.schedule.home.title'
    },
    canActivate: [UserRouteAccessService]
};
