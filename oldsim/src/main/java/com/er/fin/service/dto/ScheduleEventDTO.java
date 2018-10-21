package com.er.fin.service.dto;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.PerCompany;

import java.io.Serializable;
import java.time.DayOfWeek;

public class ScheduleEventDTO implements Serializable {

    // https://fullcalendar.io/docs/event-object

    private Long id;
    private Long cellId;
    private String title;
    private String start;
    private String end;
    private Boolean allDay;

    private DefItem ders;
    private Integer dersSira;
    private Integer dersAdet;

    private String backgroundColor= "white";
    private String borderColor = "black";
    private String textColor = "gray";

    public ScheduleEventDTO(Integer dersSira, PerCompany c, DayOfWeek dof){
        this.dersSira=dersSira;
        if (dof!=null && (dof.equals(DayOfWeek.SATURDAY) || dof.equals(DayOfWeek.SUNDAY))){
            backgroundColor="rgb(255, 204, 204)";
            return;
        }
        if (c==null){
            return;
        }
        if (dersSira<=c.getMesaiOo()){
            backgroundColor="rgb(204, 255, 153)";
        } else if (dersSira>c.getMesaiOo() &&  dersSira<=(c.getMesaiOo()+c.getMesaiOs())){
            backgroundColor="rgb(255, 255, 153)";
        } else if (dersSira>(c.getMesaiOo()+c.getMesaiOs()) &&  dersSira<=(c.getMesaiOo()+c.getMesaiOs()+c.getMesaiGc())){
            backgroundColor="rgb(224, 224, 235)";
        } else {
            backgroundColor="rgb(255, 204, 204)";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Boolean getAllDay() {
        return allDay;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public String getBorderColor() {
        return borderColor;
    }

    public void setBorderColor(String borderColor) {
        this.borderColor = borderColor;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public Integer getDersSira() {
        return dersSira;
    }

    private void setDersSira(Integer dersSira) {
        this.dersSira = dersSira;
    }

    public DefItem getDers() {
        return ders;
    }

    public void setDers(DefItem ders) {
        this.ders = ders;
        if (this.ders==null || this.ders.getId()==null){
            this.textColor = this.backgroundColor;
            this.borderColor ="black";
        } else {
            this.textColor = "black";
            this.borderColor = "blue";
        }
    }

    public Long getCellId() {
        return cellId;
    }

    public void setCellId(Long cellId) {
        this.cellId = cellId;
    }

    public Integer getDersAdet() {
        return dersAdet;
    }

    public void setDersAdet(Integer dersAdet) {
        this.dersAdet = dersAdet;
    }
}
