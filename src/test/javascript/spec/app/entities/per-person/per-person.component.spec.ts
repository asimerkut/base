/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerPersonComponent } from 'app/entities/per-person/per-person.component';
import { PerPersonService } from 'app/entities/per-person/per-person.service';
import { PerPerson } from 'app/shared/model/per-person.model';

describe('Component Tests', () => {
    describe('PerPerson Management Component', () => {
        let comp: PerPersonComponent;
        let fixture: ComponentFixture<PerPersonComponent>;
        let service: PerPersonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPersonComponent],
                providers: []
            })
                .overrideTemplate(PerPersonComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerPersonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerPersonService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerPerson(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perPeople[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
