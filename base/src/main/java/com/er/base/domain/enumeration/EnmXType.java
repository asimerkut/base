package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

public enum EnmXType implements IEnum {
    BANKA,
    BRANS,
    DERS,
    DONEM,
    DURUM,
    GGOKL,
    GYERI,
    HIZMT,
    IZIN,
    KADRO,
    KARYR,
    KONUM,
    MESLK,
    OKUL,
    SEHIR,
    SENDK,
    TATIL,
    UNVAN,
    YBDIL,
    ;
    public String getLabel(){
        return name();
    }
    public String getId(){
        return name();
    }
}
