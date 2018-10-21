import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefType } from 'app/shared/model/def-type.model';

@Component({
    selector: 'jhi-def-type-detail',
    templateUrl: './def-type-detail.component.html'
})
export class DefTypeDetailComponent implements OnInit {
    defType: IDefType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defType }) => {
            this.defType = defType;
        });
    }

    previousState() {
        window.history.back();
    }
}
