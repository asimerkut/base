package com.er.base.domain.enumeration;

import com.er.fin.domain.IEnum;

/**
 * The EnmDayOff enumeration.
 */
public enum EnmDayOff implements IEnum {
    ALL(null),
    OO(null),
    OS(null),
    GC(null),
    ;
    String label;
    EnmDayOff(String label){
        this.label = (label==null?name()+ nullFix :label);
    }
    public String getLabel(){
        return label;
    }
    public String getId(){
        return name();
    }
}
