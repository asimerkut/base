import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model/per-person.model';
import { IFiscalYear } from 'app/shared/model/fiscal-year.model';

export interface IFiscalPeriod {
    id?: number;
    code?: string;
    dateStart?: Moment;
    dateFinish?: Moment;
    state?: number;
    person?: IPerPerson;
    fiscalYear?: IFiscalYear;
}

export class FiscalPeriod implements IFiscalPeriod {
    constructor(
        public id?: number,
        public code?: string,
        public dateStart?: Moment,
        public dateFinish?: Moment,
        public state?: number,
        public person?: IPerPerson,
        public fiscalYear?: IFiscalYear
    ) {}
}
