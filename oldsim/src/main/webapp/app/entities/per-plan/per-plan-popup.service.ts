import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {PerPlan} from './per-plan.model';
import {PerPlanService} from './per-plan.service';
import {JhiDateUtils} from 'ng-jhipster';

@Injectable()
export class PerPlanPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private perPlanService: PerPlanService,
                private dateUtils: JhiDateUtils) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, startDate?: Date | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.perPlanService.find(id)
                    .subscribe((perPlanResponse: HttpResponse<PerPlan>) => {
                        const perPlan: PerPlan = perPlanResponse.body;
                        if (perPlan.startDate) {
                            perPlan.startDate = {
                                year: perPlan.startDate.getFullYear(),
                                month: perPlan.startDate.getMonth() + 1,
                                day: perPlan.startDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.perPlanModalRef(component, perPlan);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                const pln: PerPlan = new PerPlan();
                pln.startDate = this.dateUtils
                    .convertLocalDateFromServer(startDate);
                pln.startDate = {
                    year: pln.startDate.getFullYear(),
                    month: pln.startDate.getMonth() + 1,
                    day: pln.startDate.getDate()
                };
                setTimeout(() => {
                    this.ngbModalRef = this.perPlanModalRef(component, pln);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    perPlanModalRef(component: Component, perPlan: PerPlan): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.perPlan = perPlan;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
