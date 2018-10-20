/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { FiscalPeriodUpdateComponent } from 'app/entities/fiscal-period/fiscal-period-update.component';
import { FiscalPeriodService } from 'app/entities/fiscal-period/fiscal-period.service';
import { FiscalPeriod } from 'app/shared/model/fiscal-period.model';

describe('Component Tests', () => {
    describe('FiscalPeriod Management Update Component', () => {
        let comp: FiscalPeriodUpdateComponent;
        let fixture: ComponentFixture<FiscalPeriodUpdateComponent>;
        let service: FiscalPeriodService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalPeriodUpdateComponent]
            })
                .overrideTemplate(FiscalPeriodUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalPeriodUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalPeriodService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FiscalPeriod(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fiscalPeriod = entity;
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
                    const entity = new FiscalPeriod();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fiscalPeriod = entity;
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
