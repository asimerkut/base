import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerDaily } from 'app/shared/model/per-daily.model';
import { PerDailyService } from './per-daily.service';

@Component({
    selector: 'jhi-per-daily-delete-dialog',
    templateUrl: './per-daily-delete-dialog.component.html'
})
export class PerDailyDeleteDialogComponent {
    perDaily: IPerDaily;

    constructor(private perDailyService: PerDailyService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perDailyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perDailyListModification',
                content: 'Deleted an perDaily'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-daily-delete-popup',
    template: ''
})
export class PerDailyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perDaily }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerDailyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.perDaily = perDaily;
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
