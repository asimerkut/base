import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model//per-person.model';
import { IDefItem } from 'app/shared/model//def-item.model';
import { IPerExcuse } from 'app/shared/model//per-excuse.model';
import { IPerPeriodState } from 'app/shared/model//per-period-state.model';

export const enum EnmDersGrup {
    D_GS = 'D_GS',
    GG = 'GG',
    GY = 'GY'
}

export const enum EnmDay {
    D1 = 'D1',
    D2 = 'D2',
    D3 = 'D3',
    D4 = 'D4',
    D5 = 'D5',
    D6 = 'D6',
    D7 = 'D7'
}

export interface IPerSubmit {
    id?: number;
    submitDate?: Moment;
    dersGrup?: EnmDersGrup;
    dersSira?: number;
    dersAdet?: number;
    dayNo?: EnmDay;
    person?: IPerPerson;
    ders?: IDefItem;
    excuse?: IPerExcuse;
    periodState?: IPerPeriodState;
    cellId?: number;
}

export class PerSubmit implements IPerSubmit {
    constructor(
        public id?: number,
        public submitDate?: Moment,
        public dersGrup?: EnmDersGrup,
        public dersSira?: number,
        public dersAdet?: number,
        public dayNo?: EnmDay,
        public person?: IPerPerson,
        public ders?: IDefItem,
        public excuse?: IPerExcuse,
        public periodState?: IPerPeriodState,
        public cellId?: number
    ) {}
}
