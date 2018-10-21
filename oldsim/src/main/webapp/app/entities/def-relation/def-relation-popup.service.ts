import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DefRelation} from './def-relation.model';
import {DefRelationService} from './def-relation.service';
import {DefType} from '../def-type';

@Injectable()
export class DefRelationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private defRelationService: DefRelationService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, typeId?: number | any, typeCode?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.defRelationService.find(id)
                    .subscribe((defRelationResponse: HttpResponse<DefRelation>) => {
                        const defRelation: DefRelation = defRelationResponse.body;
                        this.ngbModalRef = this.defRelationModalRef(component, defRelation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                const rel: DefRelation = new DefRelation();
                if (typeId != null) {
                    const dtype: DefType = new DefType();
                    dtype.id = typeId;
                    dtype.code = typeCode;
                    rel.typeSource = dtype;
                }
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.defRelationModalRef(component, rel);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    defRelationModalRef(component: Component, defRelation: DefRelation): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.defRelation = defRelation;
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
