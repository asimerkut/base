import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDefPivot } from 'app/shared/model/def-pivot.model';

@Component({
    selector: 'jhi-def-pivot-detail',
    templateUrl: './def-pivot-detail.component.html'
})
export class DefPivotDetailComponent implements OnInit {
    defPivot: IDefPivot;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defPivot }) => {
            this.defPivot = defPivot;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
