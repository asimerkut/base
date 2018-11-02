/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BaseTestModule } from '../../../test.module';
import { FiscalYearDeleteDialogComponent } from 'app/entities/fiscal-year/fiscal-year-delete-dialog.component';
import { FiscalYearService } from 'app/entities/fiscal-year/fiscal-year.service';

describe('Component Tests', () => {
    describe('FiscalYear Management Delete Component', () => {
        let comp: FiscalYearDeleteDialogComponent;
        let fixture: ComponentFixture<FiscalYearDeleteDialogComponent>;
        let service: FiscalYearService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalYearDeleteDialogComponent]
            })
                .overrideTemplate(FiscalYearDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FiscalYearDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalYearService);
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
