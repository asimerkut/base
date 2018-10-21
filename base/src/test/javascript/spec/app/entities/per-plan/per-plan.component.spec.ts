/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerPlanComponent } from 'app/entities/per-plan/per-plan.component';
import { PerPlanService } from 'app/entities/per-plan/per-plan.service';
import { PerPlan } from 'app/shared/model/per-plan.model';

describe('Component Tests', () => {
    describe('PerPlan Management Component', () => {
        let comp: PerPlanComponent;
        let fixture: ComponentFixture<PerPlanComponent>;
        let service: PerPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPlanComponent],
                providers: []
            })
                .overrideTemplate(PerPlanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerPlanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerPlan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
