/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseTestModule } from '../../../test.module';
import { DefItemDetailComponent } from 'app/entities/def-item/def-item-detail.component';
import { DefItem } from 'app/shared/model/def-item.model';

describe('Component Tests', () => {
    describe('DefItem Management Detail Component', () => {
        let comp: DefItemDetailComponent;
        let fixture: ComponentFixture<DefItemDetailComponent>;
        const route = ({ data: of({ defItem: new DefItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
