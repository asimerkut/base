import {BaseEntity} from './../../shared';

export class DefRelation implements BaseEntity {
    constructor(public id?: number,
                public parameter?: any,
                public typeSource?: BaseEntity,
                public typeTarget?: BaseEntity) {
    }
}
