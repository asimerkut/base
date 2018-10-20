/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BaseTestModule } from '../../../test.module';
import { PerPersonDeleteDialogComponent } from 'app/entities/per-person/per-person-delete-dialog.component';
import { PerPersonService } from 'app/entities/per-person/per-person.service';

describe('Component Tests', () => {
    describe('PerPerson Management Delete Component', () => {
        let comp: PerPersonDeleteDialogComponent;
        let fixture: ComponentFixture<PerPersonDeleteDialogComponent>;
        let service: PerPersonService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPersonDeleteDialogComponent]
            })
                .overrideTemplate(PerPersonDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerPersonDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerPersonService);
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
