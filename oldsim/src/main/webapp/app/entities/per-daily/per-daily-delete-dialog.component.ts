import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {PerDaily} from './per-daily.model';
import {PerDailyPopupService} from './per-daily-popup.service';
import {PerDailyService} from './per-daily.service';

@Component({
    selector: 'jhi-per-daily-delete-dialog',
    templateUrl: './per-daily-delete-dialog.component.html'
})
export class PerDailyDeleteDialogComponent {

    perDaily: PerDaily;

    constructor(private perDailyService: PerDailyService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perDailyService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private perDailyPopupService: PerDailyPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.perDailyPopupService
                .open(PerDailyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
