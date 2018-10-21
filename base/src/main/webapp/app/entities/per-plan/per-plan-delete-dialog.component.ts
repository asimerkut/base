import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerPlan } from 'app/shared/model/per-plan.model';
import { PerPlanService } from './per-plan.service';

@Component({
    selector: 'jhi-per-plan-delete-dialog',
    templateUrl: './per-plan-delete-dialog.component.html'
})
export class PerPlanDeleteDialogComponent {
    perPlan: IPerPlan;

    constructor(private perPlanService: PerPlanService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perPlanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perPlanListModification',
                content: 'Deleted an perPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-per-plan-delete-popup',
    template: ''
})
export class PerPlanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perPlan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerPlanDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.perPlan = perPlan;
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
