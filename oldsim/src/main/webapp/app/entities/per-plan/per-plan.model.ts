import {BaseEntity} from './../../shared';

export class PerPlan implements BaseEntity {
    constructor(public id?: number,
                public cellId?: number,
                public startDate?: any,
                public dayNo?: any,
                public dersGrup?: any,
                public dersSira?: number,
                public dersAdet?: number,
                public person?: BaseEntity,
                public ders?: BaseEntity) {
    }
}
