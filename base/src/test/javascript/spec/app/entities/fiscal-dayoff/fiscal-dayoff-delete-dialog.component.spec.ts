/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BaseTestModule } from '../../../test.module';
import { FiscalDayoffDeleteDialogComponent } from 'app/entities/fiscal-dayoff/fiscal-dayoff-delete-dialog.component';
import { FiscalDayoffService } from 'app/entities/fiscal-dayoff/fiscal-dayoff.service';

describe('Component Tests', () => {
    describe('FiscalDayoff Management Delete Component', () => {
        let comp: FiscalDayoffDeleteDialogComponent;
        let fixture: ComponentFixture<FiscalDayoffDeleteDialogComponent>;
        let service: FiscalDayoffService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalDayoffDeleteDialogComponent]
            })
                .overrideTemplate(FiscalDayoffDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FiscalDayoffDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalDayoffService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
