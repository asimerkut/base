/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerPlanUpdateComponent } from 'app/entities/per-plan/per-plan-update.component';
import { PerPlanService } from 'app/entities/per-plan/per-plan.service';
import { PerPlan } from 'app/shared/model/per-plan.model';

describe('Component Tests', () => {
    describe('PerPlan Management Update Component', () => {
        let comp: PerPlanUpdateComponent;
        let fixture: ComponentFixture<PerPlanUpdateComponent>;
        let service: PerPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPlanUpdateComponent]
            })
                .overrideTemplate(PerPlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerPlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerPlanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerPlan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perPlan = entity;
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
                    const entity = new PerPlan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perPlan = entity;
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
