/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerSubmitUpdateComponent } from 'app/entities/per-submit/per-submit-update.component';
import { PerSubmitService } from 'app/entities/per-submit/per-submit.service';
import { PerSubmit } from 'app/shared/model/per-submit.model';

describe('Component Tests', () => {
    describe('PerSubmit Management Update Component', () => {
        let comp: PerSubmitUpdateComponent;
        let fixture: ComponentFixture<PerSubmitUpdateComponent>;
        let service: PerSubmitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerSubmitUpdateComponent]
            })
                .overrideTemplate(PerSubmitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerSubmitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerSubmitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerSubmit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perSubmit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerSubmit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perSubmit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
