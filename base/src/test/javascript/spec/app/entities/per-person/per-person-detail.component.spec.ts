/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerPersonDetailComponent } from 'app/entities/per-person/per-person-detail.component';
import { PerPerson } from 'app/shared/model/per-person.model';

describe('Component Tests', () => {
    describe('PerPerson Management Detail Component', () => {
        let comp: PerPersonDetailComponent;
        let fixture: ComponentFixture<PerPersonDetailComponent>;
        const route = ({ data: of({ perPerson: new PerPerson(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerPersonDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerPersonDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerPersonDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perPerson).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
