import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';

@Component({
    selector: 'jhi-fiscal-period-detail',
    templateUrl: './fiscal-period-detail.component.html'
})
export class FiscalPeriodDetailComponent implements OnInit {
    fiscalPeriod: IFiscalPeriod;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalPeriod }) => {
            this.fiscalPeriod = fiscalPeriod;
        });
    }

    previousState() {
        window.history.back();
    }
}
