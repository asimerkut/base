package com.er.fin.service.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class SchKeyDateDTO implements Serializable {

    private LocalDate dersGun;
    private Integer dersSira;

    public LocalDate getDersGun() {
        return dersGun;
    }

    public void setDersGun(LocalDate dersGun) {
        this.dersGun = dersGun;
    }

    public Integer getDersSira() {
        return dersSira;
    }

    public void setDersSira(Integer dersSira) {
        this.dersSira = dersSira;
    }

    public SchKeyDateDTO(LocalDate dersGun, Integer dersSira){
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
        SchKeyDateDTO other = (SchKeyDateDTO) obj;
        return this.dersGun.equals(other.dersGun) && this.dersSira.equals(other.dersSira);
    }


    @Override
    public int hashCode() {
        return (this.dersGun+":"+this.dersSira).hashCode();
    }

}
