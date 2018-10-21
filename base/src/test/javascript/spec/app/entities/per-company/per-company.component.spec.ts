/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerCompanyComponent } from 'app/entities/per-company/per-company.component';
import { PerCompanyService } from 'app/entities/per-company/per-company.service';
import { PerCompany } from 'app/shared/model/per-company.model';

describe('Component Tests', () => {
    describe('PerCompany Management Component', () => {
        let comp: PerCompanyComponent;
        let fixture: ComponentFixture<PerCompanyComponent>;
        let service: PerCompanyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerCompanyComponent],
                providers: []
            })
                .overrideTemplate(PerCompanyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerCompanyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerCompanyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerCompany(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perCompanies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
