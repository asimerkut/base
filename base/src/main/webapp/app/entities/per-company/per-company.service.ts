import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerCompany } from 'app/shared/model/per-company.model';

type EntityResponseType = HttpResponse<IPerCompany>;
type EntityArrayResponseType = HttpResponse<IPerCompany[]>;

@Injectable({ providedIn: 'root' })
export class PerCompanyService {
    public resourceUrl = SERVER_API_URL + 'api/per-companies';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-companies';

    constructor(private http: HttpClient) {}

    create(perCompany: IPerCompany): Observable<EntityResponseType> {
        return this.http.post<IPerCompany>(this.resourceUrl, perCompany, { observe: 'response' });
    }

    update(perCompany: IPerCompany): Observable<EntityResponseType> {
        return this.http.put<IPerCompany>(this.resourceUrl, perCompany, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerCompany>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerCompany[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerCompany[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
