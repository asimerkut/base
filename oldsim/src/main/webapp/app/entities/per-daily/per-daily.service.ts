import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {PerDaily} from './per-daily.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<PerDaily>;

@Injectable()
export class PerDailyService {
    okul: PerDaily = new PerDaily();

    private resourceUrl = SERVER_API_URL + 'api/per-dailies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/per-dailies';

    constructor(private http: HttpClient) {
    }

    create(perDaily: PerDaily): Observable<EntityResponseType> {
        const copy = this.convert(perDaily);
        return this.http.post<PerDaily>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(perDaily: PerDaily): Observable<EntityResponseType> {
        const copy = this.convert(perDaily);
        return this.http.put<PerDaily>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PerDaily>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PerDaily[]>> {
        const options = createRequestOption(req);
        return this.http.get<PerDaily[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<PerDaily[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PerDaily[]>> {
        const options = createRequestOption(req);
        return this.http.get<PerDaily[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<PerDaily[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PerDaily = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PerDaily[]>): HttpResponse<PerDaily[]> {
        const jsonResponse: PerDaily[] = res.body;
        const body: PerDaily[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PerDaily.
     */
    private convertItemFromServer(perDaily: PerDaily): PerDaily {
        const copy: PerDaily = Object.assign({}, perDaily);
        return copy;
    }

    /**
     * Convert a PerDaily to a JSON which can be sent to the server.
     */
    private convert(perDaily: PerDaily): PerDaily {
        const copy: PerDaily = Object.assign({}, perDaily);
        return copy;
    }
}
