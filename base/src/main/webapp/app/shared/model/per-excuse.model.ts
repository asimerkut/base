import { Moment } from 'moment';
import { IPerPerson } from 'app/shared/model//per-person.model';
import { IDefItem } from 'app/shared/model//def-item.model';

export interface IPerExcuse {
    id?: number;
    startDate?: Moment;
    startDersNo?: number;
    finishDate?: Moment;
    finishDersNo?: number;
    isExcuse?: boolean;
    izin?: IDefItem;
    label?: string;
}

export class PerExcuse implements IPerExcuse {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public startDersNo?: number,
        public finishDate?: Moment,
        public finishDersNo?: number,
        public isExcuse?: boolean,
        public izin?: IDefItem,
        public label?: string
    ) {
        this.isExcuse = this.isExcuse || false;
    }
}
