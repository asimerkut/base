/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefFieldDetailComponent } from 'app/entities/def-field/def-field-detail.component';
import { DefField } from 'app/shared/model/def-field.model';

describe('Component Tests', () => {
    describe('DefField Management Detail Component', () => {
        let comp: DefFieldDetailComponent;
        let fixture: ComponentFixture<DefFieldDetailComponent>;
        const route = ({ data: of({ defField: new DefField(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefFieldDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefFieldDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefFieldDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defField).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
