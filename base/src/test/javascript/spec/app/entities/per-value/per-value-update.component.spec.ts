/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerValueUpdateComponent } from 'app/entities/per-value/per-value-update.component';
import { PerValueService } from 'app/entities/per-value/per-value.service';
import { PerValue } from 'app/shared/model/per-value.model';

describe('Component Tests', () => {
    describe('PerValue Management Update Component', () => {
        let comp: PerValueUpdateComponent;
        let fixture: ComponentFixture<PerValueUpdateComponent>;
        let service: PerValueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerValueUpdateComponent]
            })
                .overrideTemplate(PerValueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerValueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerValueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerValue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perValue = entity;
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
                    const entity = new PerValue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perValue = entity;
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
