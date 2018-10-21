package com.er.fin.domain.enumeration;

/**
 * The EnmCins enumeration.
 */
public enum EnmCins implements IEnum {
    E("Erkek"),
    K("Kadın"),
    ;
    String label;
    EnmCins(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
