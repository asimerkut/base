/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerCompanyDetailComponent } from 'app/entities/per-company/per-company-detail.component';
import { PerCompany } from 'app/shared/model/per-company.model';

describe('Component Tests', () => {
    describe('PerCompany Management Detail Component', () => {
        let comp: PerCompanyDetailComponent;
        let fixture: ComponentFixture<PerCompanyDetailComponent>;
        const route = ({ data: of({ perCompany: new PerCompany(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerCompanyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerCompanyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerCompanyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perCompany).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
