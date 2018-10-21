import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DefItem} from './def-item.model';
import {DefItemService} from './def-item.service';
import {DefType} from '../def-type';

@Injectable()
export class DefItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private defItemService: DefItemService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, typeId?: number | any, typeCode?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.defItemService.find(id)
                    .subscribe((defItemResponse: HttpResponse<DefItem>) => {
                        const defItem: DefItem = defItemResponse.body;
                        this.ngbModalRef = this.defItemModalRef(component, defItem);
                        resolve(this.ngbModalRef);
                    });
            } else {
                const itm: DefItem = new DefItem();
                if (typeId != null) {
                    const dtype: DefType = new DefType();
                    dtype.id = typeId;
                    dtype.code = typeCode;
                    itm.type = dtype;
                }
                setTimeout(() => {
                    this.ngbModalRef = this.defItemModalRef(component, itm);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    defItemModalRef(component: Component, defItem: DefItem): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.defItem = defItem;
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
