import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerCompany } from 'app/shared/model/per-company.model';

@Component({
    selector: 'jhi-per-company-detail',
    templateUrl: './per-company-detail.component.html'
})
export class PerCompanyDetailComponent implements OnInit {
    perCompany: IPerCompany;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perCompany }) => {
            this.perCompany = perCompany;
        });
    }

    previousState() {
        window.history.back();
    }
}
