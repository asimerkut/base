export const enum EnmList {
    Type = 'EnmType',
    Day = 'EnmDay',
    Cins = 'EnmCins',
    Param = 'EnmParam',
    Medeni = 'EnmMedeni',
    Sozlesme = 'EnmSozlesme',
    DersGrup = 'EnmDersGrup'
}

export interface IEnmEnum {
    id?: string;
    label?: string;
}

export class EnmEnum implements IEnmEnum {
    constructor(public id?: string, public label?: string) {}
}
