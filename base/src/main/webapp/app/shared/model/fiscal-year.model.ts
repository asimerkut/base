import { Moment } from 'moment';

export interface IFiscalYear {
    id?: number;
    code?: string;
    dateStart?: Moment;
    dateFinish?: Moment;
}

export class FiscalYear implements IFiscalYear {
    constructor(public id?: number, public code?: string, public dateStart?: Moment, public dateFinish?: Moment) {}
}
