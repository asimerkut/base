package com.er.fin.dto;

import java.io.Serializable;
import java.time.DayOfWeek;

public class SchKeyWeekDTO implements Serializable {

    private DayOfWeek dersGun;
    private Integer dersSira;

    public DayOfWeek getDersGun() {
        return dersGun;
    }

    public void setDersGun(DayOfWeek dersGun) {
        this.dersGun = dersGun;
    }

    public Integer getDersSira() {
        return dersSira;
    }

    public void setDersSira(Integer dersSira) {
        this.dersSira = dersSira;
    }

    public SchKeyWeekDTO(DayOfWeek dersGun, Integer dersSira){
        this.dersGun = dersGun;
        this.dersSira = dersSira;

    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        SchKeyWeekDTO other = (SchKeyWeekDTO) obj;
        return this.dersGun.ordinal()==other.dersGun.ordinal() && this.dersSira.equals(other.dersSira);
    }


    @Override
    public int hashCode() {
        return (this.dersGun.ordinal()+":"+this.dersSira).hashCode();
    }

}
