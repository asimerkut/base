import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerPeriodState } from 'app/shared/model/per-period-state.model';

type EntityResponseType = HttpResponse<IPerPeriodState>;
type EntityArrayResponseType = HttpResponse<IPerPeriodState[]>;

@Injectable({ providedIn: 'root' })
export class PerPeriodStateService {
    public resourceUrl = SERVER_API_URL + 'api/per-period-states';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-period-states';

    constructor(private http: HttpClient) {}

    create(perPeriodState: IPerPeriodState): Observable<EntityResponseType> {
        return this.http.post<IPerPeriodState>(this.resourceUrl, perPeriodState, { observe: 'response' });
    }

    update(perPeriodState: IPerPeriodState): Observable<EntityResponseType> {
        return this.http.put<IPerPeriodState>(this.resourceUrl, perPeriodState, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerPeriodState>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerPeriodState[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerPeriodState[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
