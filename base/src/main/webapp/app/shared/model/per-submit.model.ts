import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { IDefItem } from 'app/shared/model/def-item.model';
import { IPerExcuse } from 'app/shared/model/per-excuse.model';
import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';

export const enum EnmDersGrup {
    D_GS = 'D_GS',
    GG = 'GG',
    GY = 'GY'
}

export interface IPerSubmit {
    id?: number;
    submitDate?: Moment;
    dersGrup?: EnmDersGrup;
    dersSira?: number;
    dersAdet?: number;
    person?: IPerPerson;
    ders?: IDefItem;
    excuse?: IPerExcuse;
    fiscalPeriod?: IFiscalPeriod;

    cellId?: number;
}

export class PerSubmit implements IPerSubmit {
    constructor(
        public id?: number,
        public submitDate?: Moment,
        public dersGrup?: EnmDersGrup,
        public dersSira?: number,
        public dersAdet?: number,
        public person?: IPerPerson,
        public ders?: IDefItem,
        public excuse?: IPerExcuse,
        public fiscalPeriod?: IFiscalPeriod,
        public cellId?: number
    ) {}
}
