/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefRelationDetailComponent } from 'app/entities/def-relation/def-relation-detail.component';
import { DefRelation } from 'app/shared/model/def-relation.model';

describe('Component Tests', () => {
    describe('DefRelation Management Detail Component', () => {
        let comp: DefRelationDetailComponent;
        let fixture: ComponentFixture<DefRelationDetailComponent>;
        const route = ({ data: of({ defRelation: new DefRelation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefRelationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefRelationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefRelationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
