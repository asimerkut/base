import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model//per-person.model';
import { IDefItem } from 'app/shared/model//def-item.model';
import { IFiscalPeriod } from 'app/shared/model//fiscal-period.model';

export interface IPerExcuse {
    id?: number;
    startDate?: Moment;
    startDersNo?: number;
    finishDate?: Moment;
    finishDersNo?: number;
    isExcuse?: boolean;
    person?: IPerPerson;
    izin?: IDefItem;
    fiscalPeriod?: IFiscalPeriod;
}

export class PerExcuse implements IPerExcuse {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public startDersNo?: number,
        public finishDate?: Moment,
        public finishDersNo?: number,
        public isExcuse?: boolean,
        public person?: IPerPerson,
        public izin?: IDefItem,
        public fiscalPeriod?: IFiscalPeriod
    ) {
        this.isExcuse = this.isExcuse || false;
    }
}