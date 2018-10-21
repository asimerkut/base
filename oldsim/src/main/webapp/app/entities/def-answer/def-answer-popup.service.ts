import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DefAnswer} from './def-answer.model';
import {DefAnswerService} from './def-answer.service';
import {DefRelation} from '../def-relation/def-relation.model';
import {DefType} from '../def-type';
import {DefItem} from '../def-item';

@Injectable()
export class DefAnswerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private defAnswerService: DefAnswerService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, typeId?: number | any, typeCode?: string | any, itemId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.defAnswerService.find(id)
                    .subscribe((defAnswerResponse: HttpResponse<DefAnswer>) => {
                        const defAnswer: DefAnswer = defAnswerResponse.body;
                        const defRelation: DefRelation = defAnswer.relation;
                        this.ngbModalRef = this.defAnswerModalRef(component, defAnswer, defRelation.typeSource, defAnswer.itemSource);
                        resolve(this.ngbModalRef);
                    });
            } else {
                const ans: DefAnswer = new DefAnswer();
                const itemType: DefType = new DefType();
                const itemSource = new DefItem();
                if (typeId != null) {
                    itemType.id = typeId;
                    itemType.code = typeCode;
                    itemSource.id = itemId;
                }
                setTimeout(() => {
                    this.ngbModalRef = this.defAnswerModalRef(component, ans, itemType, itemSource);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    defAnswerModalRef(component: Component, defAnswer: DefAnswer, typeSource: DefType, itemSource: DefItem): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.defAnswer = defAnswer;
        modalRef.componentInstance.typeSource = typeSource;
        modalRef.componentInstance.itemSource = itemSource;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
