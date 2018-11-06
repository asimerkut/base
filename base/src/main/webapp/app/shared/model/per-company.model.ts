import { IDefItem } from 'app/shared/model//def-item.model';

export interface IPerCompany {
    id?: number;
    code?: string;
    name?: string;
    sehir?: IDefItem;
    tipi?: IDefItem;
}

export class PerCompany implements IPerCompany {
    constructor(public id?: number, public code?: string, public name?: string, public sehir?: IDefItem, public tipi?: IDefItem) {}
}
