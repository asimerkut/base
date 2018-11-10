/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefFieldComponent } from 'app/entities/def-field/def-field.component';
import { DefFieldService } from 'app/entities/def-field/def-field.service';
import { DefField } from 'app/shared/model/def-field.model';

describe('Component Tests', () => {
    describe('DefField Management Component', () => {
        let comp: DefFieldComponent;
        let fixture: ComponentFixture<DefFieldComponent>;
        let service: DefFieldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefFieldComponent],
                providers: []
            })
                .overrideTemplate(DefFieldComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefFieldComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefFieldService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefField(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defFields[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
