import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefType } from 'app/shared/model/def-type.model';

type EntityResponseType = HttpResponse<IDefType>;
type EntityArrayResponseType = HttpResponse<IDefType[]>;

@Injectable({ providedIn: 'root' })
export class DefTypeService {
    public resourceUrl = SERVER_API_URL + 'api/def-types';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/def-types';

    constructor(private http: HttpClient) {}

    create(defType: IDefType): Observable<EntityResponseType> {
        return this.http.post<IDefType>(this.resourceUrl, defType, { observe: 'response' });
    }

    update(defType: IDefType): Observable<EntityResponseType> {
        return this.http.put<IDefType>(this.resourceUrl, defType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
