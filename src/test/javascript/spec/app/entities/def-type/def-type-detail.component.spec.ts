/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefTypeDetailComponent } from 'app/entities/def-type/def-type-detail.component';
import { DefType } from 'app/shared/model/def-type.model';

describe('Component Tests', () => {
    describe('DefType Management Detail Component', () => {
        let comp: DefTypeDetailComponent;
        let fixture: ComponentFixture<DefTypeDetailComponent>;
        const route = ({ data: of({ defType: new DefType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
