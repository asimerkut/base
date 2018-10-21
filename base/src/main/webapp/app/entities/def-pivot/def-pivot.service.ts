import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefPivot } from 'app/shared/model/def-pivot.model';

type EntityResponseType = HttpResponse<IDefPivot>;
type EntityArrayResponseType = HttpResponse<IDefPivot[]>;

@Injectable({ providedIn: 'root' })
export class DefPivotService {
    public resourceUrl = SERVER_API_URL + 'api/def-pivots';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/def-pivots';

    constructor(private http: HttpClient) {}

    create(defPivot: IDefPivot): Observable<EntityResponseType> {
        return this.http.post<IDefPivot>(this.resourceUrl, defPivot, { observe: 'response' });
    }

    update(defPivot: IDefPivot): Observable<EntityResponseType> {
        return this.http.put<IDefPivot>(this.resourceUrl, defPivot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefPivot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefPivot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefPivot[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
