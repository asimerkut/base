import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDefRelation } from 'app/shared/model/def-relation.model';
import { DefRelationService } from './def-relation.service';

@Component({
    selector: 'jhi-def-relation-delete-dialog',
    templateUrl: './def-relation-delete-dialog.component.html'
})
export class DefRelationDeleteDialogComponent {
    defRelation: IDefRelation;

    constructor(
        private defRelationService: DefRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'defRelationListModification',
                content: 'Deleted an defRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-def-relation-delete-popup',
    template: ''
})
export class DefRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DefRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.defRelation = defRelation;
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
