import {BaseEntity} from './../../shared';

export enum EnmTypeId {
    BANKA = 'BANKA',
    BRANS = 'BRANS',
    DERS = 'DERS',
    DONEM = 'DONEM',
    DURUM = 'DURUM',
    GGOKL = 'GGOKL',
    GYERI = 'GYERI',
    HIZMT = 'HIZMT',
    IZIN = 'IZIN',
    KADRO = 'KADRO',
    KARYR = 'KARYR',
    KONUM = 'KONUM',
    MESLK = 'MESLK',
    OKUL = 'OKUL',
    SEHIR = 'SEHIR',
    SENDK = 'SENDK',
    TATIL = 'TATIL',
    UNVAN = 'UNVAN',
    YBDIL = 'YBDIL',

    EnmType = 'EnmType',
    EnmDay = 'EnmDay',
    EnmCins = 'EnmCins',
    EnmParam = 'EnmParam',
    EnmMedeni = 'EnmMedeni',
    EnmSozlesme = 'EnmSozlesme',
    EnmDersGrup = 'EnmDersGrup'
}

export class DefType implements BaseEntity {
    constructor(public id?: number,
                public code?: any,
                public name?: string) {
    }
}
