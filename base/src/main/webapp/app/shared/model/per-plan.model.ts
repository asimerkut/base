import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { IDefItem } from 'app/shared/model/def-item.model';

export const enum EnmDay {
    MONDAY = 'Pazartesi',
    TUESDAY = 'Salı',
    WEDNESDAY = 'Çarşamba',
    THURSDAY = 'Perşembe',
    FRIDAY = 'Cuma',
    SATURDAY = 'Cumartesi',
    SUNDAY = 'Pazar'
}

export const enum EnmDersGrup {
    D_GS = 'D_GS',
    GG = 'GG',
    GY = 'GY'
}

export interface IPerPlan {
    id?: number;
    startDate?: Moment;
    dayNo?: EnmDay;
    dersGrup?: EnmDersGrup;
    dersSira?: number;
    dersAdet?: number;
    person?: IPerPerson;
    ders?: IDefItem;
}

export class PerPlan implements IPerPlan {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public dayNo?: EnmDay,
        public dersGrup?: EnmDersGrup,
        public dersSira?: number,
        public dersAdet?: number,
        public person?: IPerPerson,
        public ders?: IDefItem
    ) {}
}
