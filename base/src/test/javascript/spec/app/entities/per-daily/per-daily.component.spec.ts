/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerDailyComponent } from 'app/entities/per-daily/per-daily.component';
import { PerDailyService } from 'app/entities/per-daily/per-daily.service';
import { PerDaily } from 'app/shared/model/per-daily.model';

describe('Component Tests', () => {
    describe('PerDaily Management Component', () => {
        let comp: PerDailyComponent;
        let fixture: ComponentFixture<PerDailyComponent>;
        let service: PerDailyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerDailyComponent],
                providers: []
            })
                .overrideTemplate(PerDailyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerDailyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerDailyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerDaily(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perDailies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
