package com.er.fin.domain.enumeration;

/**
 * The EnmSozlesme enumeration.
 */
public enum EnmSozlesme implements IEnum {
    KADRO("Kadrolu"),
    SOZ4B("Sözleşmeli 4B"),
    UCRET("Ücretli"),
    ;
    String label;
    EnmSozlesme(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
