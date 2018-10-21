import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {PerPlan} from './per-plan.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<PerPlan>;

@Injectable()
export class PerPlanService {

    private resourceUrl = SERVER_API_URL + 'api/per-plans';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/per-plans';
    private planScheduleUrl = SERVER_API_URL + 'api/per-plans-schedule';
    private resourceUrlDate = SERVER_API_URL + 'api/per-plan-date';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(perPlan: PerPlan): Observable<EntityResponseType> {
        const copy = this.convert(perPlan);
        return this.http.post<PerPlan>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(perPlan: PerPlan): Observable<EntityResponseType> {
        const copy = this.convert(perPlan);
        return this.http.put<PerPlan>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PerPlan>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PerPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<PerPlan[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<PerPlan[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PerPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<PerPlan[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<PerPlan[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PerPlan = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PerPlan[]>): HttpResponse<PerPlan[]> {
        const jsonResponse: PerPlan[] = res.body;
        const body: PerPlan[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PerPlan.
     */
    private convertItemFromServer(perPlan: PerPlan): PerPlan {
        const copy: PerPlan = Object.assign({}, perPlan);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(perPlan.startDate);
        return copy;
    }

    /**
     * Convert a PerPlan to a JSON which can be sent to the server.
     */
    private convert(perPlan: PerPlan): PerPlan {
        const copy: PerPlan = Object.assign({}, perPlan);
        if (perPlan.startDate) {
            copy.startDate = this.dateUtils.convertLocalDateToServer(perPlan.startDate);
        }
        if (perPlan.dayNo) {
            copy.dayNo = ((copy.dayNo && copy.dayNo.id) ? copy.dayNo.id : copy.dayNo);
        }
        if (perPlan.dersGrup) {
            copy.dersGrup = ((copy.dersGrup && copy.dersGrup.id) ? copy.dersGrup.id : copy.dersGrup);
        }
        return copy;
    }

    getEvents(startDate: any, viewStart: any, viewEnd: any): Observable<any> {
        // return this.http.get('content/primeng/assets/data/json/events/scheduleevents.json')
        //    .map((response) => response);
        const req = {'startDate': startDate, 'viewStart': viewStart, 'viewEnd': viewEnd};
        const query = {'query': JSON.stringify(req)};
        const options = createRequestOption(query);
        return this.http.get(this.planScheduleUrl, {params: options, observe: 'response'})
            .map((res) => res.body as any[]);
    }

    getPlanDateList(id: string): Observable<HttpResponse<any[]>> {
        const req = {'selId': id};
        const query = {'query': JSON.stringify(req)};
        const options = createRequestOption(query);
        return this.http.get<any[]>(this.resourceUrlDate, {params: options, observe: 'response'})
            .map((res: HttpResponse<any[]>) => (res));
    }

}
