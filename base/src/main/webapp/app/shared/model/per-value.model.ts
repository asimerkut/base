import { IDefType } from 'app/shared/model//def-type.model';
import { IDefItem } from 'app/shared/model//def-item.model';
import { IPerPerson } from 'app/shared/model//per-person.model';

export interface IPerValue {
    id?: number;
    valType?: IDefType;
    valItem?: IDefItem;
    person?: IPerPerson;
}

export class PerValue implements IPerValue {
    constructor(public id?: number, public valType?: IDefType, public valItem?: IDefItem, public person?: IPerPerson) {}
}
