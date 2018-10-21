import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import 'rxjs/add/operator/map';

import {DefItem} from './def-item.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<DefItem>;

@Injectable()
export class DefItemService {

    private resourceUrl = SERVER_API_URL + 'api/def-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/def-items';

    private resourceTreeSearchUrl = SERVER_API_URL + 'api/_search/def-item-tree';
    private resourceUrlByType = SERVER_API_URL + 'api/def-item-by-type';
    private resourceUrlEnumByType = SERVER_API_URL + 'api/def-enum';

    constructor(private http: HttpClient) {
    }

    create(defItem: DefItem): Observable<EntityResponseType> {
        const copy = this.convert(defItem);
        return this.http.post<DefItem>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(defItem: DefItem): Observable<EntityResponseType> {
        const copy = this.convert(defItem);
        return this.http.put<DefItem>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DefItem>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DefItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<DefItem[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<DefItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DefItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<DefItem[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<DefItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DefItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DefItem[]>): HttpResponse<DefItem[]> {
        const jsonResponse: DefItem[] = res.body;
        const body: DefItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DefItem.
     */
    private convertItemFromServer(defItem: DefItem): DefItem {
        const copy: DefItem = Object.assign({}, defItem);
        return copy;
    }

    /**
     * Convert a DefItem to a JSON which can be sent to the server.
     */
    private convert(defItem: DefItem): DefItem {
        const copy: DefItem = Object.assign({}, defItem);
        return copy;
    }

    getTreeData(currentSearch: string): Observable<any> {
        const query = {'query': currentSearch};
        const options = createRequestOption(query);
        const ret = this.http.get(this.resourceTreeSearchUrl, {params: options, observe: 'response'})
            .map((res) => res.body as any[]);
        return ret;
    }

    findAllByTypeId(id: string): Observable<HttpResponse<DefItem[]>> {
        const req = {'selId': id};
        const query = {'query': JSON.stringify(req)};
        const options = createRequestOption(query);
        return this.http.get<DefItem[]>(this.resourceUrlByType, {params: options, observe: 'response'})
            .map((res: HttpResponse<DefItem[]>) => this.convertArrayResponse(res));
    }

    findEnumByTypeId(id: string): Observable<HttpResponse<DefItem[]>> {
        const req = {'selId': id};
        const query = {'query': JSON.stringify(req)};
        const options = createRequestOption(query);
        return this.http.get<DefItem[]>(this.resourceUrlEnumByType, {params: options, observe: 'response'})
            .map((res: HttpResponse<any[]>) => this.convertArrayResponse(res));
    }

}
