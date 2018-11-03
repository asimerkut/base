import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerSubmit } from 'app/shared/model/per-submit.model';

type EntityResponseType = HttpResponse<IPerSubmit>;
type EntityArrayResponseType = HttpResponse<IPerSubmit[]>;

@Injectable({ providedIn: 'root' })
export class PerSchedulerService {
    public resourceUrl = SERVER_API_URL + 'api/per-submits';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-submits';

    constructor(private http: HttpClient) {}

    create(perSubmit: IPerSubmit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perSubmit);
        return this.http
            .post<IPerSubmit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(perSubmit: IPerSubmit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perSubmit);
        return this.http
            .put<IPerSubmit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPerSubmit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerSubmit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerSubmit[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(perSubmit: IPerSubmit): IPerSubmit {
        const copy: IPerSubmit = Object.assign({}, perSubmit, {
            submitDate: perSubmit.submitDate != null && perSubmit.submitDate.isValid() ? perSubmit.submitDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.submitDate = res.body.submitDate != null ? moment(res.body.submitDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((perSubmit: IPerSubmit) => {
            perSubmit.submitDate = perSubmit.submitDate != null ? moment(perSubmit.submitDate) : null;
        });
        return res;
    }
}
