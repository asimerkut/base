/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefAnswerUpdateComponent } from 'app/entities/def-answer/def-answer-update.component';
import { DefAnswerService } from 'app/entities/def-answer/def-answer.service';
import { DefAnswer } from 'app/shared/model/def-answer.model';

describe('Component Tests', () => {
    describe('DefAnswer Management Update Component', () => {
        let comp: DefAnswerUpdateComponent;
        let fixture: ComponentFixture<DefAnswerUpdateComponent>;
        let service: DefAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefAnswerUpdateComponent]
            })
                .overrideTemplate(DefAnswerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefAnswerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefAnswerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefAnswer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defAnswer = entity;
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
                    const entity = new DefAnswer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defAnswer = entity;
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
