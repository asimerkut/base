import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefRelation } from 'app/shared/model/def-relation.model';

type EntityResponseType = HttpResponse<IDefRelation>;
type EntityArrayResponseType = HttpResponse<IDefRelation[]>;

@Injectable({ providedIn: 'root' })
export class DefRelationService {
    public resourceUrl = SERVER_API_URL + 'api/def-relations';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/def-relations';

    constructor(private http: HttpClient) {}

    create(defRelation: IDefRelation): Observable<EntityResponseType> {
        return this.http.post<IDefRelation>(this.resourceUrl, defRelation, { observe: 'response' });
    }

    update(defRelation: IDefRelation): Observable<EntityResponseType> {
        return this.http.put<IDefRelation>(this.resourceUrl, defRelation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefRelation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefRelation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
