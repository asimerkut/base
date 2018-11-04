import { IDefItem } from 'app/shared/model/def-item.model';

export interface IPerCompany {
    id?: number;
    code?: string;
    name?: string;
    mesaiOo?: number;
    mesaiOs?: number;
    mesaiGc?: number;
    sehir?: IDefItem;
    tipi?: IDefItem;
    label?: string;
}

export class PerCompany implements IPerCompany {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public mesaiOo?: number,
        public mesaiOs?: number,
        public mesaiGc?: number,
        public sehir?: IDefItem,
        public tipi?: IDefItem,
        public label?: string
    ) {}
}
