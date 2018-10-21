/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefPivotComponent } from 'app/entities/def-pivot/def-pivot.component';
import { DefPivotService } from 'app/entities/def-pivot/def-pivot.service';
import { DefPivot } from 'app/shared/model/def-pivot.model';

describe('Component Tests', () => {
    describe('DefPivot Management Component', () => {
        let comp: DefPivotComponent;
        let fixture: ComponentFixture<DefPivotComponent>;
        let service: DefPivotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefPivotComponent],
                providers: []
            })
                .overrideTemplate(DefPivotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefPivotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefPivotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefPivot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defPivots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
