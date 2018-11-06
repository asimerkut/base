import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerValue } from 'app/shared/model/per-value.model';
import { PerValueService } from './per-value.service';
import { IDefType } from 'app/shared/model/def-type.model';
import { DefTypeService } from 'app/entities/def-type';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from 'app/entities/per-person';

@Component({
    selector: 'jhi-per-value-update',
    templateUrl: './per-value-update.component.html'
})
export class PerValueUpdateComponent implements OnInit {
    perValue: IPerValue;
    isSaving: boolean;

    deftypes: IDefType[];

    defitems: IDefItem[];

    perpeople: IPerPerson[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perValueService: PerValueService,
        private defTypeService: DefTypeService,
        private defItemService: DefItemService,
        private perPersonService: PerPersonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perValue }) => {
            this.perValue = perValue;
        });
        this.defTypeService.query().subscribe(
            (res: HttpResponse<IDefType[]>) => {
                this.deftypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perPersonService.query().subscribe(
            (res: HttpResponse<IPerPerson[]>) => {
                this.perpeople = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perValue.id !== undefined) {
            this.subscribeToSaveResponse(this.perValueService.update(this.perValue));
        } else {
            this.subscribeToSaveResponse(this.perValueService.create(this.perValue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerValue>>) {
        result.subscribe((res: HttpResponse<IPerValue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerPersonById(index: number, item: IPerPerson) {
        return item.id;
    }
}
