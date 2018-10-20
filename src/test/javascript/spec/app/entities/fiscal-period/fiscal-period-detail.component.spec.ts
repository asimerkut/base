/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { FiscalPeriodDetailComponent } from 'app/entities/fiscal-period/fiscal-period-detail.component';
import { FiscalPeriod } from 'app/shared/model/fiscal-period.model';

describe('Component Tests', () => {
    describe('FiscalPeriod Management Detail Component', () => {
        let comp: FiscalPeriodDetailComponent;
        let fixture: ComponentFixture<FiscalPeriodDetailComponent>;
        const route = ({ data: of({ fiscalPeriod: new FiscalPeriod(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalPeriodDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FiscalPeriodDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FiscalPeriodDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fiscalPeriod).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
