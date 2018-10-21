import { IDefType } from 'app/shared/model//def-type.model';

export const enum EnmParam {
    GORV_MA_KAR = 'GORV_MA_KAR',
    GORV_EK_ZOR = 'GORV_EK_ZOR',
    GORV_EK_IST = 'GORV_EK_IST',
    DERS_MA_KAR = 'DERS_MA_KAR',
    DERS_EK_ZOR = 'DERS_EK_ZOR',
    DERS_EK_IST = 'DERS_EK_IST',
    KATSAYI = 'KATSAYI',
    DAYANAK_GOR = 'DAYANAK_GOR',
    DAYANAK_UNV = 'DAYANAK_UNV',
    GOSTERGE_GOR = 'GOSTERGE_GOR',
    TARIFE_GOR = 'TARIFE_GOR'
}

export interface IDefRelation {
    id?: number;
    parameter?: EnmParam;
    typeSource?: IDefType;
    typeTarget?: IDefType;
}

export class DefRelation implements IDefRelation {
    constructor(public id?: number, public parameter?: EnmParam, public typeSource?: IDefType, public typeTarget?: IDefType) {}
}
