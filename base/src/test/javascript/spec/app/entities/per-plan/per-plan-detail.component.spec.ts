/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerPlanDetailComponent } from 'app/entities/per-plan/per-plan-detail.component';
import { PerPlan } from 'app/shared/model/per-plan.model';

describe('Component Tests', () => {
    describe('PerPlan Management Detail Component', () => {
        let comp: PerPlanDetailComponent;
        let fixture: ComponentFixture<PerPlanDetailComponent>;
        const route = ({ data: of({ perPlan: new PerPlan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPlanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerPlanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerPlanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perPlan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
