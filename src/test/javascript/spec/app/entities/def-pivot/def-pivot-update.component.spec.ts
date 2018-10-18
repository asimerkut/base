/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefPivotUpdateComponent } from 'app/entities/def-pivot/def-pivot-update.component';
import { DefPivotService } from 'app/entities/def-pivot/def-pivot.service';
import { DefPivot } from 'app/shared/model/def-pivot.model';

describe('Component Tests', () => {
    describe('DefPivot Management Update Component', () => {
        let comp: DefPivotUpdateComponent;
        let fixture: ComponentFixture<DefPivotUpdateComponent>;
        let service: DefPivotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefPivotUpdateComponent]
            })
                .overrideTemplate(DefPivotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefPivotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefPivotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefPivot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defPivot = entity;
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
                    const entity = new DefPivot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defPivot = entity;
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
