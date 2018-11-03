/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { FiscalDayoffUpdateComponent } from 'app/entities/fiscal-dayoff/fiscal-dayoff-update.component';
import { FiscalDayoffService } from 'app/entities/fiscal-dayoff/fiscal-dayoff.service';
import { FiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

describe('Component Tests', () => {
    describe('FiscalDayoff Management Update Component', () => {
        let comp: FiscalDayoffUpdateComponent;
        let fixture: ComponentFixture<FiscalDayoffUpdateComponent>;
        let service: FiscalDayoffService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalDayoffUpdateComponent]
            })
                .overrideTemplate(FiscalDayoffUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FiscalDayoffUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FiscalDayoffService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FiscalDayoff(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fiscalDayoff = entity;
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
                    const entity = new FiscalDayoff();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fiscalDayoff = entity;
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
