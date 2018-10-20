import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerExcuse } from 'app/shared/model/per-excuse.model';

@Component({
    selector: 'jhi-per-excuse-detail',
    templateUrl: './per-excuse-detail.component.html'
})
export class PerExcuseDetailComponent implements OnInit {
    perExcuse: IPerExcuse;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perExcuse }) => {
            this.perExcuse = perExcuse;
        });
    }

    previousState() {
        window.history.back();
    }
}
