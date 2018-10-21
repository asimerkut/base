/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefAnswerComponent } from 'app/entities/def-answer/def-answer.component';
import { DefAnswerService } from 'app/entities/def-answer/def-answer.service';
import { DefAnswer } from 'app/shared/model/def-answer.model';

describe('Component Tests', () => {
    describe('DefAnswer Management Component', () => {
        let comp: DefAnswerComponent;
        let fixture: ComponentFixture<DefAnswerComponent>;
        let service: DefAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefAnswerComponent],
                providers: []
            })
                .overrideTemplate(DefAnswerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefAnswerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefAnswerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefAnswer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defAnswers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
