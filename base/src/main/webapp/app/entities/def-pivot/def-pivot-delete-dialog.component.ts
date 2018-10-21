import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDefPivot } from 'app/shared/model/def-pivot.model';
import { DefPivotService } from './def-pivot.service';

@Component({
    selector: 'jhi-def-pivot-delete-dialog',
    templateUrl: './def-pivot-delete-dialog.component.html'
})
export class DefPivotDeleteDialogComponent {
    defPivot: IDefPivot;

    constructor(private defPivotService: DefPivotService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defPivotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'defPivotListModification',
                content: 'Deleted an defPivot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-def-pivot-delete-popup',
    template: ''
})
export class DefPivotDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defPivot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DefPivotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.defPivot = defPivot;
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
