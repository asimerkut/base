import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';
import { FiscalDayoffService } from './fiscal-dayoff.service';

@Component({
    selector: 'jhi-fiscal-dayoff-delete-dialog',
    templateUrl: './fiscal-dayoff-delete-dialog.component.html'
})
export class FiscalDayoffDeleteDialogComponent {
    fiscalDayoff: IFiscalDayoff;

    constructor(
        private fiscalDayoffService: FiscalDayoffService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fiscalDayoffService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fiscalDayoffListModification',
                content: 'Deleted an fiscalDayoff'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fiscal-dayoff-delete-popup',
    template: ''
})
export class FiscalDayoffDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fiscalDayoff }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FiscalDayoffDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fiscalDayoff = fiscalDayoff;
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
