import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerExcuse } from 'app/shared/model/per-excuse.model';

type EntityResponseType = HttpResponse<IPerExcuse>;
type EntityArrayResponseType = HttpResponse<IPerExcuse[]>;

@Injectable({ providedIn: 'root' })
export class PerExcuseService {
    public resourceUrl = SERVER_API_URL + 'api/per-excuses';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-excuses';

    constructor(private http: HttpClient) {}

    create(perExcuse: IPerExcuse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perExcuse);
        return this.http
            .post<IPerExcuse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(perExcuse: IPerExcuse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perExcuse);
        return this.http
            .put<IPerExcuse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPerExcuse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerExcuse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerExcuse[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(perExcuse: IPerExcuse): IPerExcuse {
        const copy: IPerExcuse = Object.assign({}, perExcuse, {
            startDate: perExcuse.startDate != null && perExcuse.startDate.isValid() ? perExcuse.startDate.format(DATE_FORMAT) : null,
            finishDate: perExcuse.finishDate != null && perExcuse.finishDate.isValid() ? perExcuse.finishDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((perExcuse: IPerExcuse) => {
            perExcuse.startDate = perExcuse.startDate != null ? moment(perExcuse.startDate) : null;
            perExcuse.finishDate = perExcuse.finishDate != null ? moment(perExcuse.finishDate) : null;
        });
        return res;
    }
}
