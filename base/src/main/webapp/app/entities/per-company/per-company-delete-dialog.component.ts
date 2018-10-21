import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerCompany } from 'app/shared/model/per-company.model';
import { PerCompanyService } from './per-company.service';

@Component({
    selector: 'jhi-per-company-delete-dialog',
    templateUrl: './per-company-delete-dialog.component.html'
})
export class PerCompanyDeleteDialogComponent {
    perCompany: IPerCompany;

    constructor(private perCompanyService: PerCompanyService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perCompanyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perCompanyListModification',
                content: 'Deleted an perCompany'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-company-delete-popup',
    template: ''
})
export class PerCompanyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perCompany }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerCompanyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.perCompany = perCompany;
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
