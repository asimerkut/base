/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { DefItemComponent } from 'app/entities/def-item/def-item.component';
import { DefItemService } from 'app/entities/def-item/def-item.service';
import { DefItem } from 'app/shared/model/def-item.model';

describe('Component Tests', () => {
    describe('DefItem Management Component', () => {
        let comp: DefItemComponent;
        let fixture: ComponentFixture<DefItemComponent>;
        let service: DefItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [DefItemComponent],
                providers: []
            })
                .overrideTemplate(DefItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
