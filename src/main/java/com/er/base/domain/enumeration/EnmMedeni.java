package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmMedeni enumeration.
 */
public enum EnmMedeni implements IEnum {
    BEK("Bekâr"),
    EVL("Evli"),
    DUL("Dul"),
    BOS("-"),
    ;
    String label;
    EnmMedeni(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
