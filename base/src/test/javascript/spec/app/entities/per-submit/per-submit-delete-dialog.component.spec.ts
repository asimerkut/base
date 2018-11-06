/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BaseTestModule } from '../../../test.module';
import { PerSubmitDeleteDialogComponent } from 'app/entities/per-submit/per-submit-delete-dialog.component';
import { PerSubmitService } from 'app/entities/per-submit/per-submit.service';

describe('Component Tests', () => {
    describe('PerSubmit Management Delete Component', () => {
        let comp: PerSubmitDeleteDialogComponent;
        let fixture: ComponentFixture<PerSubmitDeleteDialogComponent>;
        let service: PerSubmitService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerSubmitDeleteDialogComponent]
            })
                .overrideTemplate(PerSubmitDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerSubmitDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerSubmitService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
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
                )
            );
        });
    });
});
