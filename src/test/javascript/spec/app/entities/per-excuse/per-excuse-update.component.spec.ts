/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerExcuseUpdateComponent } from 'app/entities/per-excuse/per-excuse-update.component';
import { PerExcuseService } from 'app/entities/per-excuse/per-excuse.service';
import { PerExcuse } from 'app/shared/model/per-excuse.model';

describe('Component Tests', () => {
    describe('PerExcuse Management Update Component', () => {
        let comp: PerExcuseUpdateComponent;
        let fixture: ComponentFixture<PerExcuseUpdateComponent>;
        let service: PerExcuseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerExcuseUpdateComponent]
            })
                .overrideTemplate(PerExcuseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerExcuseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerExcuseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerExcuse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perExcuse = entity;
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
                    const entity = new PerExcuse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perExcuse = entity;
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
