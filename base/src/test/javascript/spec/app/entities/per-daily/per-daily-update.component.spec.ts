/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerDailyUpdateComponent } from 'app/entities/per-daily/per-daily-update.component';
import { PerDailyService } from 'app/entities/per-daily/per-daily.service';
import { PerDaily } from 'app/shared/model/per-daily.model';

describe('Component Tests', () => {
    describe('PerDaily Management Update Component', () => {
        let comp: PerDailyUpdateComponent;
        let fixture: ComponentFixture<PerDailyUpdateComponent>;
        let service: PerDailyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerDailyUpdateComponent]
            })
                .overrideTemplate(PerDailyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerDailyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerDailyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerDaily(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perDaily = entity;
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
                    const entity = new PerDaily();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perDaily = entity;
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
