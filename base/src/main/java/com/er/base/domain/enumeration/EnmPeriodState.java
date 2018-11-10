package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmPeriodState enumeration.
 */
public enum EnmPeriodState implements IEnum {
    P10("Gelecek"),
    P20("Aktif"),
    P30("Geçmiş"),
    P40("Pasif"),
    ;
    String label;
    EnmPeriodState(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
