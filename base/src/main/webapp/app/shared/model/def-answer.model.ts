import { IDefRelation } from 'app/shared/model/def-relation.model';
import { IDefItem } from 'app/shared/model/def-item.model';

export interface IDefAnswer {
    id?: number;
    answer?: string;
    relation?: IDefRelation;
    itemSource?: IDefItem;
    itemTarget?: IDefItem;
    code?: string;
}

export class DefAnswer implements IDefAnswer {
    constructor(
        public id?: number,
        public answer?: string,
        public relation?: IDefRelation,
        public itemSource?: IDefItem,
        public itemTarget?: IDefItem,
        public code?: string
    ) {}
}
