/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefFieldUpdateComponent } from 'app/entities/def-field/def-field-update.component';
import { DefFieldService } from 'app/entities/def-field/def-field.service';
import { DefField } from 'app/shared/model/def-field.model';

describe('Component Tests', () => {
    describe('DefField Management Update Component', () => {
        let comp: DefFieldUpdateComponent;
        let fixture: ComponentFixture<DefFieldUpdateComponent>;
        let service: DefFieldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefFieldUpdateComponent]
            })
                .overrideTemplate(DefFieldUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefFieldUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefFieldService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefField(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defField = entity;
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
                    const entity = new DefField();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defField = entity;
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
