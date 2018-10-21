import { IDefType } from 'app/shared/model//def-type.model';
import { IDefItem } from 'app/shared/model//def-item.model';

export interface IDefItem {
    id?: number;
    code?: string;
    name?: string;
    itemLevel?: number;
    isSelect?: boolean;
    isConst?: boolean;
    type?: IDefType;
    parent?: IDefItem;
}

export class DefItem implements IDefItem {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public itemLevel?: number,
        public isSelect?: boolean,
        public isConst?: boolean,
        public type?: IDefType,
        public parent?: IDefItem
    ) {
        this.isSelect = this.isSelect || false;
        this.isConst = this.isConst || false;
    }
}
