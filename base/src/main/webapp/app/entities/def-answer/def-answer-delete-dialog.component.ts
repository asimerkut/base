import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDefAnswer } from 'app/shared/model/def-answer.model';
import { DefAnswerService } from './def-answer.service';

@Component({
    selector: 'jhi-def-answer-delete-dialog',
    templateUrl: './def-answer-delete-dialog.component.html'
})
export class DefAnswerDeleteDialogComponent {
    defAnswer: IDefAnswer;

    constructor(private defAnswerService: DefAnswerService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defAnswerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'defAnswerListModification',
                content: 'Deleted an defAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-def-answer-delete-popup',
    template: ''
})
export class DefAnswerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defAnswer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DefAnswerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.defAnswer = defAnswer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
