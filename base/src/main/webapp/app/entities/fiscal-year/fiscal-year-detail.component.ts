import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiscalYear } from 'app/shared/model/fiscal-year.model';

@Component({
    selector: 'jhi-fiscal-year-detail',
    templateUrl: './fiscal-year-detail.component.html'
})
export class FiscalYearDetailComponent implements OnInit {
    fiscalYear: IFiscalYear;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalYear }) => {
            this.fiscalYear = fiscalYear;
        });
    }

    previousState() {
        window.history.back();
    }
}
