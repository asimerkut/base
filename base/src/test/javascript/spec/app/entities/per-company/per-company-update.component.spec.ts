/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerCompanyUpdateComponent } from 'app/entities/per-company/per-company-update.component';
import { PerCompanyService } from 'app/entities/per-company/per-company.service';
import { PerCompany } from 'app/shared/model/per-company.model';

describe('Component Tests', () => {
    describe('PerCompany Management Update Component', () => {
        let comp: PerCompanyUpdateComponent;
        let fixture: ComponentFixture<PerCompanyUpdateComponent>;
        let service: PerCompanyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerCompanyUpdateComponent]
            })
                .overrideTemplate(PerCompanyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerCompanyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerCompanyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerCompany(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perCompany = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerCompany();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perCompany = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
