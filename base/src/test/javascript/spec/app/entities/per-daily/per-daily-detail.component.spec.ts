/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { PerDailyDetailComponent } from 'app/entities/per-daily/per-daily-detail.component';
import { PerDaily } from 'app/shared/model/per-daily.model';

describe('Component Tests', () => {
    describe('PerDaily Management Detail Component', () => {
        let comp: PerDailyDetailComponent;
        let fixture: ComponentFixture<PerDailyDetailComponent>;
        const route = ({ data: of({ perDaily: new PerDaily(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerDailyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerDailyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerDailyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perDaily).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
