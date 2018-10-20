package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmParam enumeration.
 */
public enum EnmParam implements IEnum {
    GORV_MA_KAR(null),
    GORV_EK_ZOR(null),
    GORV_EK_IST(null),
    DERS_MA_KAR(null),
    DERS_EK_ZOR(null),
    DERS_EK_IST(null),
    KATSAYI(null),
    DAYANAK_GOR(null),
    DAYANAK_UNV(null),
    GOSTERGE_GOR(null),
    TARIFE_GOR(null),
    ;
    String label;
    EnmParam(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}

