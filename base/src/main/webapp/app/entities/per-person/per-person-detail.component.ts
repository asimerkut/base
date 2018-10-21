import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerPerson } from 'app/shared/model/per-person.model';

@Component({
    selector: 'jhi-per-person-detail',
    templateUrl: './per-person-detail.component.html'
})
export class PerPersonDetailComponent implements OnInit {
    perPerson: IPerPerson;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perPerson }) => {
            this.perPerson = perPerson;
        });
    }

    previousState() {
        window.history.back();
    }
}
