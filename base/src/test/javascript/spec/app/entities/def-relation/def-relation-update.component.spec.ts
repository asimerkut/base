/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefRelationUpdateComponent } from 'app/entities/def-relation/def-relation-update.component';
import { DefRelationService } from 'app/entities/def-relation/def-relation.service';
import { DefRelation } from 'app/shared/model/def-relation.model';

describe('Component Tests', () => {
    describe('DefRelation Management Update Component', () => {
        let comp: DefRelationUpdateComponent;
        let fixture: ComponentFixture<DefRelationUpdateComponent>;
        let service: DefRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefRelationUpdateComponent]
            })
                .overrideTemplate(DefRelationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefRelationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefRelationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefRelation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defRelation = entity;
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
                    const entity = new DefRelation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defRelation = entity;
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
