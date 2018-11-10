import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefField } from 'app/shared/model/def-field.model';

@Component({
    selector: 'jhi-def-field-detail',
    templateUrl: './def-field-detail.component.html'
})
export class DefFieldDetailComponent implements OnInit {
    defField: IDefField;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defField }) => {
            this.defField = defField;
        });
    }

    previousState() {
        window.history.back();
    }
}
