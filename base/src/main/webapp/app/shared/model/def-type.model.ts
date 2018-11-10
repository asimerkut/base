export const enum EnmType {
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
    YBDIL = 'YBDIL'
}

export interface IDefType {
    id?: number;
    code?: EnmType;
    name?: string;
    label?: string;
}

export class DefType implements IDefType {
    constructor(public id?: number, public code?: EnmType, public name?: string, public label?: string) {}
}
