/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefAnswerDetailComponent } from 'app/entities/def-answer/def-answer-detail.component';
import { DefAnswer } from 'app/shared/model/def-answer.model';

describe('Component Tests', () => {
    describe('DefAnswer Management Detail Component', () => {
        let comp: DefAnswerDetailComponent;
        let fixture: ComponentFixture<DefAnswerDetailComponent>;
        const route = ({ data: of({ defAnswer: new DefAnswer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefAnswerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefAnswerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefAnswerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
