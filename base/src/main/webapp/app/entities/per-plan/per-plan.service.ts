import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerPlan } from 'app/shared/model/per-plan.model';

type EntityResponseType = HttpResponse<IPerPlan>;
type EntityArrayResponseType = HttpResponse<IPerPlan[]>;

@Injectable({ providedIn: 'root' })
export class PerPlanService {
    public resourceUrl = SERVER_API_URL + 'api/per-plans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-plans';

    constructor(private http: HttpClient) {}

    create(perPlan: IPerPlan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perPlan);
        return this.http
            .post<IPerPlan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(perPlan: IPerPlan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(perPlan);
        return this.http
            .put<IPerPlan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPerPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerPlan[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(perPlan: IPerPlan): IPerPlan {
        const copy: IPerPlan = Object.assign({}, perPlan, {
            startDate: perPlan.startDate != null && perPlan.startDate.isValid() ? perPlan.startDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((perPlan: IPerPlan) => {
            perPlan.startDate = perPlan.startDate != null ? moment(perPlan.startDate) : null;
        });
        return res;
    }
}
