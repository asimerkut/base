/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerExcuseDetailComponent } from 'app/entities/per-excuse/per-excuse-detail.component';
import { PerExcuse } from 'app/shared/model/per-excuse.model';

describe('Component Tests', () => {
    describe('PerExcuse Management Detail Component', () => {
        let comp: PerExcuseDetailComponent;
        let fixture: ComponentFixture<PerExcuseDetailComponent>;
        const route = ({ data: of({ perExcuse: new PerExcuse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerExcuseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerExcuseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerExcuseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perExcuse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
