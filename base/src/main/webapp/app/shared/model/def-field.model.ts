export const enum EnmSelect {
    FLDTYPE = 'FLDTYPE',
    FLDSTRG = 'FLDSTRG',
    FLDNUMB = 'FLDNUMB',
    FLDDATE = 'FLDDATE'
}

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

export interface IDefField {
    id?: number;
    tabName?: string;
    ordNo?: number;
    grpName?: string;
    fldCaption?: string;
    selSelect?: EnmSelect;
    selType?: EnmType;
}

export class DefField implements IDefField {
    constructor(
        public id?: number,
        public tabName?: string,
        public ordNo?: number,
        public grpName?: string,
        public fldCaption?: string,
        public selSelect?: EnmSelect,
        public selType?: EnmType
    ) {}
}
