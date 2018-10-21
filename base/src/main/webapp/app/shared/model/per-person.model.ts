import { IPerCompany } from 'app/shared/model//per-company.model';
import { IDefItem } from 'app/shared/model//def-item.model';
import { IUser } from 'app/core/user/user.model';

export const enum EnmSozlesme {
    KADRO = 'KADRO',
    SOZ4B = 'SOZ4B',
    UCRET = 'UCRET'
}

export const enum EnmCins {
    E = 'E',
    K = 'K'
}

export const enum EnmMedeni {
    BEK = 'BEK',
    EVL = 'EVL',
    DUL = 'DUL',
    BOS = 'BOS'
}

export interface IPerPerson {
    id?: number;
    code?: string;
    name?: string;
    isActive?: boolean;
    sozlesme?: EnmSozlesme;
    email?: string;
    phone?: string;
    cins?: EnmCins;
    medeni?: EnmMedeni;
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
        public sozlesme?: EnmSozlesme,
        public email?: string,
        public phone?: string,
        public cins?: EnmCins,
        public medeni?: EnmMedeni,
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
