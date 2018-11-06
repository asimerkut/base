/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PerSubmitService } from 'app/entities/per-submit/per-submit.service';
import { IPerSubmit, PerSubmit, EnmDersGrup, EnmDay } from 'app/shared/model/per-submit.model';

describe('Service Tests', () => {
    describe('PerSubmit Service', () => {
        let injector: TestBed;
        let service: PerSubmitService;
        let httpMock: HttpTestingController;
        let elemDefault: IPerSubmit;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PerSubmitService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PerSubmit(0, currentDate, EnmDersGrup.D_GS, 0, 0, EnmDay.D1);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        submitDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a PerSubmit', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        submitDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        submitDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PerSubmit(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PerSubmit', async () => {
                const returnedFromService = Object.assign(
                    {
                        submitDate: currentDate.format(DATE_FORMAT),
                        dersGrup: 'BBBBBB',
                        dersSira: 1,
                        dersAdet: 1,
                        dayNo: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        submitDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of PerSubmit', async () => {
                const returnedFromService = Object.assign(
                    {
                        submitDate: currentDate.format(DATE_FORMAT),
                        dersGrup: 'BBBBBB',
                        dersSira: 1,
                        dersAdet: 1,
                        dayNo: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        submitDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a PerSubmit', async () => {
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
