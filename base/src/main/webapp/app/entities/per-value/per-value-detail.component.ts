import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerValue } from 'app/shared/model/per-value.model';

@Component({
    selector: 'jhi-per-value-detail',
    templateUrl: './per-value-detail.component.html'
})
export class PerValueDetailComponent implements OnInit {
    perValue: IPerValue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perValue }) => {
            this.perValue = perValue;
        });
    }

    previousState() {
        window.history.back();
    }
}
