import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerPerson } from 'app/shared/model/per-person.model';

type EntityResponseType = HttpResponse<IPerPerson>;
type EntityArrayResponseType = HttpResponse<IPerPerson[]>;

@Injectable({ providedIn: 'root' })
export class PerPersonService {
    public resourceUrl = SERVER_API_URL + 'api/per-people';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/per-people';

    constructor(private http: HttpClient) {}

    create(perPerson: IPerPerson): Observable<EntityResponseType> {
        return this.http.post<IPerPerson>(this.resourceUrl, perPerson, { observe: 'response' });
    }

    update(perPerson: IPerPerson): Observable<EntityResponseType> {
        return this.http.put<IPerPerson>(this.resourceUrl, this.convert(perPerson), { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerPerson>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerPerson[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerPerson[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    private convert(perPerson: IPerPerson): IPerPerson {
        const copy: IPerPerson = Object.assign({}, perPerson);
        copy.sozlesme = copy.sozlesme && copy.sozlesme.id ? copy.sozlesme.id : copy.sozlesme;
        copy.medeni = copy.medeni && copy.medeni.id ? copy.medeni.id : copy.medeni;
        copy.cins = copy.cins && copy.cins.id ? copy.cins.id : copy.cins;
        return copy;
    }
}
