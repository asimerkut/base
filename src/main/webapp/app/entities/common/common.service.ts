import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from 'app/shared';
import { IDefItem } from 'app/shared/model/def-item.model';

@Injectable({ providedIn: 'root' })
export class CommonService {
    private resourceTreeSearchUrl = SERVER_API_URL + 'api/common/def-item-tree';
    private resourceUrlByType = SERVER_API_URL + 'api/common/def-item-by-type';
    private resourceUrlEnumByType = SERVER_API_URL + 'api/common/def-enum';

    constructor(private http: HttpClient) {}

    getTreeData(currentSearch: string): Observable<any> {
        const query = { query: currentSearch };
        const options = createRequestOption(query);
        const ret = this.http.get(this.resourceTreeSearchUrl, { params: options, observe: 'response' }).map(res => res.body as any[]);
        return ret;
    }

    findAllByTypeId(id: string): Observable<HttpResponse<IDefItem[]>> {
        const req = { selId: id };
        const query = { query: JSON.stringify(req) };
        const options = createRequestOption(query);
        return this.http.get<IDefItem[]>(this.resourceUrlByType, { params: options, observe: 'response' });
    }

    findEnumByTypeId(id: string): Observable<HttpResponse<IDefItem[]>> {
        const req = { selId: id };
        const query = { query: JSON.stringify(req) };
        const options = createRequestOption(query);
        return this.http.get<IDefItem[]>(this.resourceUrlEnumByType, { params: options, observe: 'response' });
    }
}