/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefRelationComponent } from 'app/entities/def-relation/def-relation.component';
import { DefRelationService } from 'app/entities/def-relation/def-relation.service';
import { DefRelation } from 'app/shared/model/def-relation.model';

describe('Component Tests', () => {
    describe('DefRelation Management Component', () => {
        let comp: DefRelationComponent;
        let fixture: ComponentFixture<DefRelationComponent>;
        let service: DefRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefRelationComponent],
                providers: []
            })
                .overrideTemplate(DefRelationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefRelationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefRelation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
