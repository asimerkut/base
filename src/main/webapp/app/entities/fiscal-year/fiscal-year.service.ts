import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';

type EntityResponseType = HttpResponse<IFiscalYear>;
type EntityArrayResponseType = HttpResponse<IFiscalYear[]>;

@Injectable({ providedIn: 'root' })
export class FiscalYearService {
    public resourceUrl = SERVER_API_URL + 'api/fiscal-years';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/fiscal-years';

    constructor(private http: HttpClient) {}

    create(fiscalYear: IFiscalYear): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalYear);
        return this.http
            .post<IFiscalYear>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fiscalYear: IFiscalYear): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalYear);
        return this.http
            .put<IFiscalYear>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFiscalYear>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalYear[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalYear[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fiscalYear: IFiscalYear): IFiscalYear {
        const copy: IFiscalYear = Object.assign({}, fiscalYear, {
            dateStart: fiscalYear.dateStart != null && fiscalYear.dateStart.isValid() ? fiscalYear.dateStart.format(DATE_FORMAT) : null,
            dateFinish: fiscalYear.dateFinish != null && fiscalYear.dateFinish.isValid() ? fiscalYear.dateFinish.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateStart = res.body.dateStart != null ? moment(res.body.dateStart) : null;
        res.body.dateFinish = res.body.dateFinish != null ? moment(res.body.dateFinish) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fiscalYear: IFiscalYear) => {
            fiscalYear.dateStart = fiscalYear.dateStart != null ? moment(fiscalYear.dateStart) : null;
            fiscalYear.dateFinish = fiscalYear.dateFinish != null ? moment(fiscalYear.dateFinish) : null;
        });
        return res;
    }
}
