package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmSelect enumeration.
 */
public enum EnmSelect implements IEnum {
    FLDTYPE("Seçim"),
    FLDSTRG("Harf"),
    FLDNUMB("Rakam"),
    FLDDATE("Tarih"),
    ;
    String label;
    EnmSelect(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
