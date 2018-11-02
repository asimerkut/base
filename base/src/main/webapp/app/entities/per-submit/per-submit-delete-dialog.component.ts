import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerSubmit } from 'app/shared/model/per-submit.model';
import { PerSubmitService } from './per-submit.service';

@Component({
    selector: 'jhi-per-submit-delete-dialog',
    templateUrl: './per-submit-delete-dialog.component.html'
})
export class PerSubmitDeleteDialogComponent {
    perSubmit: IPerSubmit;

    constructor(private perSubmitService: PerSubmitService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perSubmitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perSubmitListModification',
                content: 'Deleted an perSubmit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-submit-delete-popup',
    template: ''
})
export class PerSubmitDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perSubmit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerSubmitDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.perSubmit = perSubmit;
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
