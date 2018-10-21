import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';

type EntityResponseType = HttpResponse<IFiscalPeriod>;
type EntityArrayResponseType = HttpResponse<IFiscalPeriod[]>;

@Injectable({ providedIn: 'root' })
export class FiscalPeriodService {
    public resourceUrl = SERVER_API_URL + 'api/fiscal-periods';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/fiscal-periods';

    constructor(private http: HttpClient) {}

    create(fiscalPeriod: IFiscalPeriod): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalPeriod);
        return this.http
            .post<IFiscalPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fiscalPeriod: IFiscalPeriod): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalPeriod);
        return this.http
            .put<IFiscalPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFiscalPeriod>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalPeriod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalPeriod[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fiscalPeriod: IFiscalPeriod): IFiscalPeriod {
        const copy: IFiscalPeriod = Object.assign({}, fiscalPeriod, {
            dateStart:
                fiscalPeriod.dateStart != null && fiscalPeriod.dateStart.isValid() ? fiscalPeriod.dateStart.format(DATE_FORMAT) : null,
            dateFinish:
                fiscalPeriod.dateFinish != null && fiscalPeriod.dateFinish.isValid() ? fiscalPeriod.dateFinish.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateStart = res.body.dateStart != null ? moment(res.body.dateStart) : null;
        res.body.dateFinish = res.body.dateFinish != null ? moment(res.body.dateFinish) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fiscalPeriod: IFiscalPeriod) => {
            fiscalPeriod.dateStart = fiscalPeriod.dateStart != null ? moment(fiscalPeriod.dateStart) : null;
            fiscalPeriod.dateFinish = fiscalPeriod.dateFinish != null ? moment(fiscalPeriod.dateFinish) : null;
        });
        return res;
    }
}
