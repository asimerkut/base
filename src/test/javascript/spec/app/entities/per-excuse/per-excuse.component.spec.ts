/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerExcuseComponent } from 'app/entities/per-excuse/per-excuse.component';
import { PerExcuseService } from 'app/entities/per-excuse/per-excuse.service';
import { PerExcuse } from 'app/shared/model/per-excuse.model';

describe('Component Tests', () => {
    describe('PerExcuse Management Component', () => {
        let comp: PerExcuseComponent;
        let fixture: ComponentFixture<PerExcuseComponent>;
        let service: PerExcuseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerExcuseComponent],
                providers: []
            })
                .overrideTemplate(PerExcuseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerExcuseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerExcuseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerExcuse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perExcuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
