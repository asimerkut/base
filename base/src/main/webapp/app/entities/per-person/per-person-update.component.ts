import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerPerson } from 'app/shared/model/per-person.model';
import { PerPersonService } from './per-person.service';
import { IUser, UserService } from 'app/core';
import { IPerValue } from '../../shared/model/per-value.model';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';

@Component({
    selector: 'jhi-per-person-update',
    templateUrl: './per-person-update.component.html'
})
export class PerPersonUpdateComponent implements OnInit {
    perPerson: IPerPerson;
    isSaving: boolean;

    users: IUser[];

    valCols: any[];
    personValLists: IPerValue[];

    selectedVal: IPerValue;
    displayDialog: boolean;

    defitems: IDefItem[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perPersonService: PerPersonService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private defItemService: DefItemService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perPerson }) => {
            this.perPerson = perPerson;
            this.personValLists = perPerson.valLists;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.defItemService.query().subscribe(
            (res: HttpResponse<IDefItem[]>) => {
                this.defitems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.valCols = [{ field: 'valType', subfield: 'label', header: 'Tanım' }, { field: 'valItem', subfield: 'label', header: 'Değer' }];
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perPerson.id !== undefined) {
            this.subscribeToSaveResponse(this.perPersonService.update(this.perPerson));
        } else {
            this.subscribeToSaveResponse(this.perPersonService.create(this.perPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerPerson>>) {
        result.subscribe((res: HttpResponse<IPerPerson>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    onRowSelect(event) {
        // this.newCar = false;
        this.selectedVal = this.cloneVal(event.data);
        this.displayDialog = true;
    }

    saveVal() {
        /*
        let cars = [...this.cars];
        if (this.newCar)
            cars.push(this.car);
        else
            cars[this.cars.indexOf(this.selectedCar)] = this.car;

        this.cars = cars;
        this.car = null;
        */
        this.displayDialog = false;
    }

    deleteVal() {
        /*
        let index = this.cars.indexOf(this.selectedCar);
        this.cars = this.cars.filter((val, i) => i != index);
        this.car = null;
        */
        this.displayDialog = false;
    }

    cloneVal(oldObj: IPerValue): IPerValue {
        let newObj = {};
        for (let prop in oldObj) {
            newObj[prop] = oldObj[prop];
        }
        return newObj;
    }

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }
}
