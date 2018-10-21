import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDefAnswer } from 'app/shared/model/def-answer.model';
import { DefAnswerService } from './def-answer.service';
import { IDefRelation } from 'app/shared/model/def-relation.model';
import { DefRelationService } from 'app/entities/def-relation';
import { IDefItem } from 'app/shared/model/def-item.model';
import { DefItemService } from 'app/entities/def-item';
import { CommonService } from 'app/entities/common';

@Component({
    selector: 'jhi-def-answer-update',
    templateUrl: './def-answer-update.component.html'
})
export class DefAnswerUpdateComponent implements OnInit {
    defAnswer: IDefAnswer;
    isSaving: boolean;

    defrelations: IDefRelation[];

    //defitems: IDefItem[];
    defTargetItems: IDefItem[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private defAnswerService: DefAnswerService,
        private defRelationService: DefRelationService,
        private defItemService: DefItemService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defAnswer }) => {
            this.defAnswer = defAnswer;
        });
        this.defRelationService.query().subscribe(
            (res: HttpResponse<IDefRelation[]>) => {
                this.defrelations = res.body;
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
        if (this.defAnswer.relation != null) {
            const rel: IDefRelation = this.defAnswer.relation;
            this.commonService.findAllByTypeId(rel.typeTarget.code).subscribe(
                (res: HttpResponse<IDefItem[]>) => {
                    this.defTargetItems = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.defTargetItems = null;
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defAnswer.id !== undefined) {
            this.subscribeToSaveResponse(this.defAnswerService.update(this.defAnswer));
        } else {
            this.subscribeToSaveResponse(this.defAnswerService.create(this.defAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefAnswer>>) {
        result.subscribe((res: HttpResponse<IDefAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDefRelationById(index: number, item: IDefRelation) {
        return item.id;
    }

    trackDefItemById(index: number, item: IDefItem) {
        return item.id;
    }
}
