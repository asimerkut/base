import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerValue } from 'app/shared/model/per-value.model';

type EntityResponseType = HttpResponse<IPerValue>;
type EntityArrayResponseType = HttpResponse<IPerValue[]>;

@Injectable({ providedIn: 'root' })
export class PerValueService {
    public resourceUrl = SERVER_API_URL + 'api/per-values';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-values';

    constructor(private http: HttpClient) {}

    create(perValue: IPerValue): Observable<EntityResponseType> {
        return this.http.post<IPerValue>(this.resourceUrl, perValue, { observe: 'response' });
    }

    update(perValue: IPerValue): Observable<EntityResponseType> {
        return this.http.put<IPerValue>(this.resourceUrl, perValue, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerValue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerValue[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerValue[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
