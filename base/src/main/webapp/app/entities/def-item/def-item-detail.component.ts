import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefItem } from 'app/shared/model/def-item.model';

@Component({
    selector: 'jhi-def-item-detail',
    templateUrl: './def-item-detail.component.html'
})
export class DefItemDetailComponent implements OnInit {
    defItem: IDefItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defItem }) => {
            this.defItem = defItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
