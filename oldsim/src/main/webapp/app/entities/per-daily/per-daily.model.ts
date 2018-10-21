import {BaseEntity} from './../../shared';

export class PerDaily implements BaseEntity {
    constructor(public id?: number,
                public dersSira?: number,
                public hourStart?: string,
                public hourFinish?: string,
                public okul?: BaseEntity) {
    }
}
