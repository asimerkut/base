import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerDaily } from 'app/shared/model/per-daily.model';

@Component({
    selector: 'jhi-per-daily-detail',
    templateUrl: './per-daily-detail.component.html'
})
export class PerDailyDetailComponent implements OnInit {
    perDaily: IPerDaily;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perDaily }) => {
            this.perDaily = perDaily;
        });
    }

    previousState() {
        window.history.back();
    }
}
