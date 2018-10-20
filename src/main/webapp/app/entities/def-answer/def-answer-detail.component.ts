import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefAnswer } from 'app/shared/model/def-answer.model';

@Component({
    selector: 'jhi-def-answer-detail',
    templateUrl: './def-answer-detail.component.html'
})
export class DefAnswerDetailComponent implements OnInit {
    defAnswer: IDefAnswer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defAnswer }) => {
            this.defAnswer = defAnswer;
        });
    }

    previousState() {
        window.history.back();
    }
}
