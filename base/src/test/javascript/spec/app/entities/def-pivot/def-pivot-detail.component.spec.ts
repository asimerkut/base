/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefPivotDetailComponent } from 'app/entities/def-pivot/def-pivot-detail.component';
import { DefPivot } from 'app/shared/model/def-pivot.model';

describe('Component Tests', () => {
    describe('DefPivot Management Detail Component', () => {
        let comp: DefPivotDetailComponent;
        let fixture: ComponentFixture<DefPivotDetailComponent>;
        const route = ({ data: of({ defPivot: new DefPivot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefPivotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefPivotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefPivotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defPivot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
