import {BaseEntity, User} from './../../shared';

export class PerPerson implements BaseEntity {
    constructor(public id?: number,
                public code?: string,
                public name?: string,
                public isActive?: boolean,
                public sozlesme?: any,
                public email?: string,
                public phone?: string,
                public cins?: any,
                public medeni?: any,
                public okul?: BaseEntity,
                public hizmt?: BaseEntity,
                public brans?: BaseEntity,
                public unvan?: BaseEntity,
                public kadro?: BaseEntity,
                public karyr?: BaseEntity,
                public konum?: BaseEntity,
                public user?: User) {
        this.isActive = false;
    }
}
