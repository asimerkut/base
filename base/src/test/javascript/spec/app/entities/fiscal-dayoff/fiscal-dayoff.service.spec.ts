/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FiscalDayoffService } from 'app/entities/fiscal-dayoff/fiscal-dayoff.service';
import { IFiscalDayoff, FiscalDayoff, EnmDayOff } from 'app/shared/model/fiscal-dayoff.model';

describe('Service Tests', () => {
    describe('FiscalDayoff Service', () => {
        let injector: TestBed;
        let service: FiscalDayoffService;
        let httpMock: HttpTestingController;
        let elemDefault: IFiscalDayoff;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FiscalDayoffService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new FiscalDayoff(0, 'AAAAAAA', currentDate, EnmDayOff.ALL);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateStart: currentDate.format(DATE_FORMAT)
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

            it('should create a FiscalDayoff', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateStart: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateStart: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new FiscalDayoff(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FiscalDayoff', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        dateStart: currentDate.format(DATE_FORMAT),
                        dayoffType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateStart: currentDate
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

            it('should return a list of FiscalDayoff', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        dateStart: currentDate.format(DATE_FORMAT),
                        dayoffType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateStart: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a FiscalDayoff', async () => {
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
