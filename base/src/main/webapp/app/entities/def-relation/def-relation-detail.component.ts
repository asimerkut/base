import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefRelation } from 'app/shared/model/def-relation.model';

@Component({
    selector: 'jhi-def-relation-detail',
    templateUrl: './def-relation-detail.component.html'
})
export class DefRelationDetailComponent implements OnInit {
    defRelation: IDefRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defRelation }) => {
            this.defRelation = defRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
