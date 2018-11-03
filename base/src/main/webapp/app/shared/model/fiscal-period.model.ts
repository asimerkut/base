import { Moment } from 'moment';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';
import { IDefItem } from 'app/shared/model/def-item.model';

export interface IFiscalPeriod {
    id?: number;
    code?: string;
    month?: string;
    week?: number;
    dateStart?: Moment;
    dateFinish?: Moment;
    entry?: boolean;
    fiscalYear?: IFiscalYear;
    donem?: IDefItem;
}

export class FiscalPeriod implements IFiscalPeriod {
    constructor(
        public id?: number,
        public code?: string,
        public month?: string,
        public week?: number,
        public dateStart?: Moment,
        public dateFinish?: Moment,
        public entry?: boolean,
        public fiscalYear?: IFiscalYear,
        public donem?: IDefItem
    ) {
        this.entry = this.entry || false;
    }
}
