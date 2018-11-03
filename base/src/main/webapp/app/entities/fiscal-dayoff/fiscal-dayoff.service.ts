import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFiscalDayoff } from 'app/shared/model/fiscal-dayoff.model';

type EntityResponseType = HttpResponse<IFiscalDayoff>;
type EntityArrayResponseType = HttpResponse<IFiscalDayoff[]>;

@Injectable({ providedIn: 'root' })
export class FiscalDayoffService {
    public resourceUrl = SERVER_API_URL + 'api/fiscal-dayoffs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/fiscal-dayoffs';

    constructor(private http: HttpClient) {}

    create(fiscalDayoff: IFiscalDayoff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalDayoff);
        return this.http
            .post<IFiscalDayoff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fiscalDayoff: IFiscalDayoff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fiscalDayoff);
        return this.http
            .put<IFiscalDayoff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFiscalDayoff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalDayoff[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFiscalDayoff[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(fiscalDayoff: IFiscalDayoff): IFiscalDayoff {
        const copy: IFiscalDayoff = Object.assign({}, fiscalDayoff, {
            dateStart:
                fiscalDayoff.dateStart != null && fiscalDayoff.dateStart.isValid() ? fiscalDayoff.dateStart.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateStart = res.body.dateStart != null ? moment(res.body.dateStart) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fiscalDayoff: IFiscalDayoff) => {
            fiscalDayoff.dateStart = fiscalDayoff.dateStart != null ? moment(fiscalDayoff.dateStart) : null;
        });
        return res;
    }
}
