import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefItem } from 'app/shared/model/def-item.model';

type EntityResponseType = HttpResponse<IDefItem>;
type EntityArrayResponseType = HttpResponse<IDefItem[]>;

@Injectable({ providedIn: 'root' })
export class DefItemService {
    public resourceUrl = SERVER_API_URL + 'api/def-items';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/def-items';

    constructor(private http: HttpClient) {}

    create(defItem: IDefItem): Observable<EntityResponseType> {
        return this.http.post<IDefItem>(this.resourceUrl, defItem, { observe: 'response' });
    }

    update(defItem: IDefItem): Observable<EntityResponseType> {
        return this.http.put<IDefItem>(this.resourceUrl, defItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDefItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
