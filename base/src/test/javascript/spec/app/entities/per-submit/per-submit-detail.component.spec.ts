/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerSubmitDetailComponent } from 'app/entities/per-submit/per-submit-detail.component';
import { PerSubmit } from 'app/shared/model/per-submit.model';

describe('Component Tests', () => {
    describe('PerSubmit Management Detail Component', () => {
        let comp: PerSubmitDetailComponent;
        let fixture: ComponentFixture<PerSubmitDetailComponent>;
        const route = ({ data: of({ perSubmit: new PerSubmit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerSubmitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerSubmitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerSubmitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perSubmit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
