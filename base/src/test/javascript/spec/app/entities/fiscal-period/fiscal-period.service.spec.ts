/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FiscalPeriodService } from 'app/entities/fiscal-period/fiscal-period.service';
import { IFiscalPeriod, FiscalPeriod } from 'app/shared/model/fiscal-period.model';

describe('Service Tests', () => {
    describe('FiscalPeriod Service', () => {
        let injector: TestBed;
        let service: FiscalPeriodService;
        let httpMock: HttpTestingController;
        let elemDefault: IFiscalPeriod;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FiscalPeriodService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new FiscalPeriod(0, 'AAAAAAA', currentDate, currentDate, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateFinish: currentDate.format(DATE_FORMAT)
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

            it('should create a FiscalPeriod', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateFinish: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateStart: currentDate,
                        dateFinish: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new FiscalPeriod(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FiscalPeriod', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateFinish: currentDate.format(DATE_FORMAT),
                        state: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateStart: currentDate,
                        dateFinish: currentDate
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

            it('should return a list of FiscalPeriod', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateFinish: currentDate.format(DATE_FORMAT),
                        state: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateStart: currentDate,
                        dateFinish: currentDate
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

            it('should delete a FiscalPeriod', async () => {
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
