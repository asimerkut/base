/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { FiscalYearComponent } from 'app/entities/fiscal-year/fiscal-year.component';
import { FiscalYearService } from 'app/entities/fiscal-year/fiscal-year.service';
import { FiscalYear } from 'app/shared/model/fiscal-year.model';

describe('Component Tests', () => {
    describe('FiscalYear Management Component', () => {
        let comp: FiscalYearComponent;
        let fixture: ComponentFixture<FiscalYearComponent>;
        let service: FiscalYearService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalYearComponent],
                providers: []
            })
                .overrideTemplate(FiscalYearComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalYearComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalYearService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FiscalYear(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fiscalYears[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
