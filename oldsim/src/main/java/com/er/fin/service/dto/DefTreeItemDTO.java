package com.er.fin.service.dto;


import java.io.Serializable;
import java.util.List;


public class DefTreeItemDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private DefTreeDataDTO data;
    private List<DefTreeItemDTO> children;

    public DefTreeDataDTO getData() {
        return data;
    }

    public void setData(DefTreeDataDTO data) {
        this.data = data;
    }

    public List<DefTreeItemDTO> getChildren() {
        return children;
    }

    public void setChildren(List<DefTreeItemDTO> children) {
        this.children = children;
    }

}
