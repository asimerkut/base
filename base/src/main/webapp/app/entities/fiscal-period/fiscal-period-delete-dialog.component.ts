import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { FiscalPeriodService } from './fiscal-period.service';

@Component({
    selector: 'jhi-fiscal-period-delete-dialog',
    templateUrl: './fiscal-period-delete-dialog.component.html'
})
export class FiscalPeriodDeleteDialogComponent {
    fiscalPeriod: IFiscalPeriod;

    constructor(
        private fiscalPeriodService: FiscalPeriodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fiscalPeriodService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fiscalPeriodListModification',
                content: 'Deleted an fiscalPeriod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiscal-period-delete-popup',
    template: ''
})
export class FiscalPeriodDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalPeriod }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FiscalPeriodDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fiscalPeriod = fiscalPeriod;
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
