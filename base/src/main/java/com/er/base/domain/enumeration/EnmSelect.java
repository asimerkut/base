package com.er.base.domain.enumeration;

/**
 * The EnmSelect enumeration.
 */
public enum EnmSelect {
    FLDTYPE("Seçim"),
    FLDSTRG("Harf"),
    FLDNUMB("Sayı"),
    FLDDATE("Tarih"),
    ;
    String label;
    EnmSelect(String label){
        this.label = (label==null?name()+ "" :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }

}
