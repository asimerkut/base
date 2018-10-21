import {BaseEntity} from './../../shared';

export class PerSubmit implements BaseEntity {
    constructor(public id?: number,
                public cellId?: number,
                public submitDate?: any,
                public dersGrup?: any,
                public dersSira?: number,
                public dersAdet?: number,
                public person?: BaseEntity,
                public ders?: BaseEntity,
                public excuse?: BaseEntity) {
    }
}
