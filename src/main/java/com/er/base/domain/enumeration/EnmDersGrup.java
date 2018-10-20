package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmDersGrup enumeration.
 */
public enum EnmDersGrup implements IEnum {
    D_GS(null),
    GG(null),
    GY(null),
    ;
    String label;
    EnmDersGrup(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
