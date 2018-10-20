/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BaseTestModule } from '../../../test.module';
import { PerSubmitComponent } from 'app/entities/per-submit/per-submit.component';
import { PerSubmitService } from 'app/entities/per-submit/per-submit.service';
import { PerSubmit } from 'app/shared/model/per-submit.model';

describe('Component Tests', () => {
    describe('PerSubmit Management Component', () => {
        let comp: PerSubmitComponent;
        let fixture: ComponentFixture<PerSubmitComponent>;
        let service: PerSubmitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTestModule],
                declarations: [PerSubmitComponent],
                providers: []
            })
                .overrideTemplate(PerSubmitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerSubmitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerSubmitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PerSubmit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.perSubmits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
