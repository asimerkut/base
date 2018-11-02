import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerPeriodState } from 'app/shared/model/per-period-state.model';

@Component({
    selector: 'jhi-per-period-state-detail',
    templateUrl: './per-period-state-detail.component.html'
})
export class PerPeriodStateDetailComponent implements OnInit {
    perPeriodState: IPerPeriodState;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perPeriodState }) => {
            this.perPeriodState = perPeriodState;
        });
    }

    previousState() {
        window.history.back();
    }
}
