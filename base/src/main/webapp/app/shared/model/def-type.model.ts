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
    code?: string;
    name?: string;
    label?: string;
}

export class DefType implements IDefType {
    constructor(public id?: number, public code?: string, public name?: string, public label?: string) {}
}
