/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerValueComponent } from 'app/entities/per-value/per-value.component';
import { PerValueService } from 'app/entities/per-value/per-value.service';
import { PerValue } from 'app/shared/model/per-value.model';

describe('Component Tests', () => {
    describe('PerValue Management Component', () => {
        let comp: PerValueComponent;
        let fixture: ComponentFixture<PerValueComponent>;
        let service: PerValueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerValueComponent],
                providers: []
            })
                .overrideTemplate(PerValueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerValueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerValueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerValue(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perValues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
