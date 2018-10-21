import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerPlan } from 'app/shared/model/per-plan.model';

@Component({
    selector: 'jhi-per-plan-detail',
    templateUrl: './per-plan-detail.component.html'
})
export class PerPlanDetailComponent implements OnInit {
    perPlan: IPerPlan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perPlan }) => {
            this.perPlan = perPlan;
        });
    }

    previousState() {
        window.history.back();
    }
}
