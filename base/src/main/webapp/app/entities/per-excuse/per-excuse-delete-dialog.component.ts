import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerExcuse } from 'app/shared/model/per-excuse.model';
import { PerExcuseService } from './per-excuse.service';

@Component({
    selector: 'jhi-per-excuse-delete-dialog',
    templateUrl: './per-excuse-delete-dialog.component.html'
})
export class PerExcuseDeleteDialogComponent {
    perExcuse: IPerExcuse;

    constructor(private perExcuseService: PerExcuseService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perExcuseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perExcuseListModification',
                content: 'Deleted an perExcuse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-excuse-delete-popup',
    template: ''
})
export class PerExcuseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perExcuse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerExcuseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.perExcuse = perExcuse;
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
