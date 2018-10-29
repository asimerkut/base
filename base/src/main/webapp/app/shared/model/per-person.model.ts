import { IPerCompany } from 'app/shared/model/per-company.model';
import { IDefItem } from 'app/shared/model/def-item.model';
import { IUser } from 'app/core/user/user.model';
import { IEnmEnum } from './enm-enum.model';

export interface IPerPerson {
    id?: number;
    code?: string;
    name?: string;
    isActive?: boolean;
    sozlesme?: any;
    email?: string;
    phone?: string;
    cins?: any;
    medeni?: any;
    okul?: IPerCompany;
    hizmt?: IDefItem;
    brans?: IDefItem;
    unvan?: IDefItem;
    kadro?: IDefItem;
    karyr?: IDefItem;
    konum?: IDefItem;
    user?: IUser;
}

export class PerPerson implements IPerPerson {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public isActive?: boolean,
        public sozlesme?: any,
        public email?: string,
        public phone?: string,
        public cins?: any,
        public medeni?: any,
        public okul?: IPerCompany,
        public hizmt?: IDefItem,
        public brans?: IDefItem,
        public unvan?: IDefItem,
        public kadro?: IDefItem,
        public karyr?: IDefItem,
        public konum?: IDefItem,
        public user?: IUser
    ) {
        this.isActive = this.isActive || false;
    }
}
