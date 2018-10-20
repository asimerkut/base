package com.er.fin.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ScheduleDataDTO implements Serializable {

    private List<ScheduleEventDTO> data = new ArrayList<>();

    public List<ScheduleEventDTO> getData() {
        return data;
    }

    public void setData(List<ScheduleEventDTO> data) {
        this.data = data;
    }

    public ScheduleDataDTO(List<ScheduleEventDTO> data){
        this.data = data;
    }

}
