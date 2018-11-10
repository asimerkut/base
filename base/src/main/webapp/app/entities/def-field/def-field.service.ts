import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefField } from 'app/shared/model/def-field.model';

type EntityResponseType = HttpResponse<IDefField>;
type EntityArrayResponseType = HttpResponse<IDefField[]>;

@Injectable({ providedIn: 'root' })
export class DefFieldService {
    public resourceUrl = SERVER_API_URL + 'api/def-fields';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/def-fields';

    constructor(private http: HttpClient) {}

    create(defField: IDefField): Observable<EntityResponseType> {
        return this.http.post<IDefField>(this.resourceUrl, defField, { observe: 'response' });
    }

    update(defField: IDefField): Observable<EntityResponseType> {
        return this.http.put<IDefField>(this.resourceUrl, defField, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefField>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefField[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefField[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
