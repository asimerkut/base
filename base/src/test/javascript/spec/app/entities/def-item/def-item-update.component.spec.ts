/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefItemUpdateComponent } from 'app/entities/def-item/def-item-update.component';
import { DefItemService } from 'app/entities/def-item/def-item.service';
import { DefItem } from 'app/shared/model/def-item.model';

describe('Component Tests', () => {
    describe('DefItem Management Update Component', () => {
        let comp: DefItemUpdateComponent;
        let fixture: ComponentFixture<DefItemUpdateComponent>;
        let service: DefItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefItemUpdateComponent]
            })
                .overrideTemplate(DefItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefItem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defItem = entity;
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
                    const entity = new DefItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defItem = entity;
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
