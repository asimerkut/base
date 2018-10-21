package com.er.fin.domain.enumeration;

/**
 * The EnmType enumeration.
 */
public enum EnmType implements IEnum {
    BANKA(null),
    BRANS(null),
    DERS(null),
    DONEM(null),
    DURUM(null),
    GGOKL(null),
    GYERI(null),
    HIZMT(null),
    IZIN(null),
    KADRO(null),
    KARYR(null),
    KONUM(null),
    MESLK(null),
    OKUL(null),
    SEHIR(null),
    SENDK(null),
    TATIL(null),
    UNVAN(null),
    YBDIL(null),
    ;
    String label;
    EnmType(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
