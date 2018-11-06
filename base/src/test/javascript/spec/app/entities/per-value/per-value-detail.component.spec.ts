/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerValueDetailComponent } from 'app/entities/per-value/per-value-detail.component';
import { PerValue } from 'app/shared/model/per-value.model';

describe('Component Tests', () => {
    describe('PerValue Management Detail Component', () => {
        let comp: PerValueDetailComponent;
        let fixture: ComponentFixture<PerValueDetailComponent>;
        const route = ({ data: of({ perValue: new PerValue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerValueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerValueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerValueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perValue).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
