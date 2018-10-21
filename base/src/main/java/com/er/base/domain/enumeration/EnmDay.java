package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmCins enumeration.
 */
public enum EnmDay implements IEnum {
    MONDAY("Pazartesi"),
    TUESDAY("Salı"),
    WEDNESDAY("Çarşamba"),
    THURSDAY("Perşembe"),
    FRIDAY("Cuma"),
    SATURDAY("Cumartesi"),
    SUNDAY("Pazar"),
    ;
    String label;
    EnmDay(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
