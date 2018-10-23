import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from 'app/shared';
import { IDefItem } from 'app/shared/model/def-item.model';
import { IDefPivot } from 'app/shared/model/def-pivot.model';
import { IEnmEnum } from 'app/shared/model/enm-enum.model';

//export type PivotResponseType = HttpResponse<IDefPivot>;

@Injectable({ providedIn: 'root' })
export class CommonService {
    private resourcePivotData = SERVER_API_URL + 'api/common/def-pivot-data';

    private resourceTreeSearchUrl = SERVER_API_URL + 'api/common/def-item-tree';
    private resourceUrlByType = SERVER_API_URL + 'api/common/def-item-by-type';
    private resourceUrlEnumByType = SERVER_API_URL + 'api/common/def-enum';

    private submitScheduleUrl = SERVER_API_URL + 'api/common/per-submits-schedule';
    private initScheduleUrl = SERVER_API_URL + 'api/common/per-submits-initialize';

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

    findEnumByTypeId(id: string): Observable<HttpResponse<IEnmEnum[]>> {
        const req = { selId: id };
        const query = { query: JSON.stringify(req) };
        const options = createRequestOption(query);
        return this.http.get<IEnmEnum[]>(this.resourceUrlEnumByType, { params: options, observe: 'response' });
    }

    getEvents(viewStart: any, viewEnd: any): Observable<any> {
        // return this.http.get('content/primeng/assets/data/json/events/scheduleevents.json')
        //    .map((response) => response);
        const req = { viewStart: viewStart, viewEnd: viewEnd };
        const query = { query: JSON.stringify(req) };
        const options = createRequestOption(query);
        return this.http.get(this.submitScheduleUrl, { params: options, observe: 'response' }).map(res => res.body as any[]);
    }

    initEvents(viewStart: any, viewEnd: any): Observable<any> {
        // return this.http.get('content/primeng/assets/data/json/events/scheduleevents.json')
        //    .map((response) => response);
        const req = { viewStart: viewStart, viewEnd: viewEnd };
        const query = { query: JSON.stringify(req) };
        const options = createRequestOption(query);
        return this.http.get(this.initScheduleUrl, { params: options, observe: 'response' }).map(res => res.body as any[]);
    }

    getPivotData(id: number): Observable<any> {
        return this.http.get(`${this.resourcePivotData}/${id}`, { observe: 'response' }).map(res => res.body as any[]);
        //.map((res: PivotResponseType) => this.convertResponse(res));
    }
}
