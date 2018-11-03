/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { FiscalDayoffDetailComponent } from 'app/entities/fiscal-dayoff/fiscal-dayoff-detail.component';
import { FiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

describe('Component Tests', () => {
    describe('FiscalDayoff Management Detail Component', () => {
        let comp: FiscalDayoffDetailComponent;
        let fixture: ComponentFixture<FiscalDayoffDetailComponent>;
        const route = ({ data: of({ fiscalDayoff: new FiscalDayoff(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [FiscalDayoffDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FiscalDayoffDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FiscalDayoffDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fiscalDayoff).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
