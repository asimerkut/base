import { Moment } from 'moment';
import { IFiscalYear } from 'app/shared/model//fiscal-year.model';
import { IDefItem } from 'app/shared/model//def-item.model';

export const enum EnmDayOff {
    ALL = 'ALL',
    OO = 'OO',
    OS = 'OS',
    GC = 'GC'
}

export interface IFiscalDayoff {
    id?: number;
    code?: string;
    dateStart?: Moment;
    dayoffType?: EnmDayOff;
    fiscalYear?: IFiscalYear;
    tatil?: IDefItem;
}

export class FiscalDayoff implements IFiscalDayoff {
    constructor(
        public id?: number,
        public code?: string,
        public dateStart?: Moment,
        public dayoffType?: EnmDayOff,
        public fiscalYear?: IFiscalYear,
        public tatil?: IDefItem
    ) {}
}
