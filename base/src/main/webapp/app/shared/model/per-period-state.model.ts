import { IFiscalPeriod } from 'app/shared/model/fiscal-period.model';
import { IPerPerson } from 'app/shared/model/per-person.model';

export const enum EnmPeriodState {
    P10 = 'P10',
    P20 = 'P20',
    P30 = 'P30',
    P40 = 'P40'
}

export interface IPerPeriodState {
    id?: number;
    periodState?: EnmPeriodState;
    fiscalPeriod?: IFiscalPeriod;
    person?: IPerPerson;
    code?: string;
}

export class PerPeriodState implements IPerPeriodState {
    constructor(
        public id?: number, public periodState?: EnmPeriodState, public fiscalPeriod?: IFiscalPeriod, public person?: IPerPerson,
        public code?: string
    ) {}
}
