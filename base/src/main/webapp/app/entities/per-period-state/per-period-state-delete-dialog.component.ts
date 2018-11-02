import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerPeriodState } from 'app/shared/model/per-period-state.model';
import { PerPeriodStateService } from './per-period-state.service';

@Component({
    selector: 'jhi-per-period-state-delete-dialog',
    templateUrl: './per-period-state-delete-dialog.component.html'
})
export class PerPeriodStateDeleteDialogComponent {
    perPeriodState: IPerPeriodState;

    constructor(
        private perPeriodStateService: PerPeriodStateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perPeriodStateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perPeriodStateListModification',
                content: 'Deleted an perPeriodState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-period-state-delete-popup',
    template: ''
})
export class PerPeriodStateDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perPeriodState }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerPeriodStateDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perPeriodState = perPeriodState;
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
