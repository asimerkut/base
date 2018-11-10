import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from './def-item.service';
import {EnmType, IDefType} from 'app/shared/model/def-type.model';
import { DefTypeService } from 'app/entities/def-type';
import {CommonService} from 'app/entities/common';

@Component({
    selector: 'jhi-def-item-update',
    templateUrl: './def-item-update.component.html'
})
export class DefItemUpdateComponent implements OnInit {
    defItem: IDefItem;
    isSaving: boolean;

    deftypes: IDefType[];

    defitems: IDefItem[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private defItemService: DefItemService,
        private defTypeService: DefTypeService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defItem }) => {
            this.defItem = defItem;
        });
        this.defTypeService.query().subscribe(
            (res: HttpResponse<IDefType[]>) => {
                this.deftypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.defItem.parent = this.defItemService.selectedTreePlace.data;
        this.commonService.findAllByTypeId(this.defItemService.comboSelModel.comboSel.code).subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        /*
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        */

    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defItem.id !== undefined) {
            this.subscribeToSaveResponse(this.defItemService.update(this.defItem));
        } else {
            this.subscribeToSaveResponse(this.defItemService.create(this.defItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefItem>>) {
        result.subscribe((res: HttpResponse<IDefItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDefTypeById(index: number, item: IDefType) {
        return item.id;
    }

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }
}
