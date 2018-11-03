import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

@Component({
    selector: 'jhi-fiscal-dayoff-detail',
    templateUrl: './fiscal-dayoff-detail.component.html'
})
export class FiscalDayoffDetailComponent implements OnInit {
    fiscalDayoff: IFiscalDayoff;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalDayoff }) => {
            this.fiscalDayoff = fiscalDayoff;
        });
    }

    previousState() {
        window.history.back();
    }
}
