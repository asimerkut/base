/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { FiscalDayoffComponent } from 'app/entities/fiscal-dayoff/fiscal-dayoff.component';
import { FiscalDayoffService } from 'app/entities/fiscal-dayoff/fiscal-dayoff.service';
import { FiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

describe('Component Tests', () => {
    describe('FiscalDayoff Management Component', () => {
        let comp: FiscalDayoffComponent;
        let fixture: ComponentFixture<FiscalDayoffComponent>;
        let service: FiscalDayoffService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalDayoffComponent],
                providers: []
            })
                .overrideTemplate(FiscalDayoffComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalDayoffComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalDayoffService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FiscalDayoff(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fiscalDayoffs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
