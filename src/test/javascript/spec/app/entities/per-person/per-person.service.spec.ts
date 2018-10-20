/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PerPersonService } from 'app/entities/per-person/per-person.service';
import { IPerPerson, PerPerson, EnmSozlesme, EnmCins, EnmMedeni } from 'app/shared/model/per-person.model';

describe('Service Tests', () => {
    describe('PerPerson Service', () => {
        let injector: TestBed;
        let service: PerPersonService;
        let httpMock: HttpTestingController;
        let elemDefault: IPerPerson;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PerPersonService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PerPerson(0, 'AAAAAAA', 'AAAAAAA', false, EnmSozlesme.KADRO, 'AAAAAAA', 'AAAAAAA', EnmCins.E, EnmMedeni.BEK);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a PerPerson', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PerPerson(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PerPerson', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        name: 'BBBBBB',
                        isActive: true,
                        sozlesme: 'BBBBBB',
                        email: 'BBBBBB',
                        phone: 'BBBBBB',
                        cins: 'BBBBBB',
                        medeni: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of PerPerson', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        name: 'BBBBBB',
                        isActive: true,
                        sozlesme: 'BBBBBB',
                        email: 'BBBBBB',
                        phone: 'BBBBBB',
                        cins: 'BBBBBB',
                        medeni: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a PerPerson', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
