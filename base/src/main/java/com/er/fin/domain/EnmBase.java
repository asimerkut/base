package com.er.fin.domain;

public class EnmBase implements IEnum {

    private String id;
    private String label;

    public EnmBase(IEnum e){
        this.id = e.getId();
        this.label = e.getLabel();
    }

    public EnmBase(String id, String label) {
        this.id = id;
        this.label = label;
    }

    public static EnmBase getDefEnum(IEnum e){
        return new EnmBase(e);
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String name() {
        return this.id;
    }
}
