/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefTypeComponent } from 'app/entities/def-type/def-type.component';
import { DefTypeService } from 'app/entities/def-type/def-type.service';
import { DefType } from 'app/shared/model/def-type.model';

describe('Component Tests', () => {
    describe('DefType Management Component', () => {
        let comp: DefTypeComponent;
        let fixture: ComponentFixture<DefTypeComponent>;
        let service: DefTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefTypeComponent],
                providers: []
            })
                .overrideTemplate(DefTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
