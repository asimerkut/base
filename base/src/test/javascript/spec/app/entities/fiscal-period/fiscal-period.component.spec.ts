/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { FiscalPeriodComponent } from 'app/entities/fiscal-period/fiscal-period.component';
import { FiscalPeriodService } from 'app/entities/fiscal-period/fiscal-period.service';
import { FiscalPeriod } from 'app/shared/model/fiscal-period.model';

describe('Component Tests', () => {
    describe('FiscalPeriod Management Component', () => {
        let comp: FiscalPeriodComponent;
        let fixture: ComponentFixture<FiscalPeriodComponent>;
        let service: FiscalPeriodService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalPeriodComponent],
                providers: []
            })
                .overrideTemplate(FiscalPeriodComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalPeriodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalPeriodService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FiscalPeriod(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fiscalPeriods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
