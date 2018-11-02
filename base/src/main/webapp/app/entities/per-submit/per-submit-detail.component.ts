import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerSubmit } from 'app/shared/model/per-submit.model';

@Component({
    selector: 'jhi-per-submit-detail',
    templateUrl: './per-submit-detail.component.html'
})
export class PerSubmitDetailComponent implements OnInit {
    perSubmit: IPerSubmit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perSubmit }) => {
            this.perSubmit = perSubmit;
        });
    }

    previousState() {
        window.history.back();
    }
}
