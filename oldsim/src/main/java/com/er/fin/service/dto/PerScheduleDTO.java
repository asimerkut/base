package com.er.fin.service.dto;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.PerExcuse;
import com.er.fin.domain.PerPerson;
import com.er.fin.domain.enumeration.EnmDersGrup;

import java.io.Serializable;
import java.time.DayOfWeek;

public interface PerScheduleDTO extends Serializable {

    Long getId();
    void setId(Long id);

    EnmDersGrup getDersGrup();
    void setDersGrup(EnmDersGrup enmDersGrup);

    Integer getDersSira();
    void setDersSira(Integer dersSira);

    Integer getDersAdet();
    void setDersAdet(Integer dersAdet);

    PerPerson getPerson();
    void setPerson(PerPerson perPerson);

    DefItem getDers();
    void setDers(DefItem defItem);

    PerExcuse getExcuse();
    void setExcuse(PerExcuse perExcuse);

    Long getCellId();
    void setCellId(Long cellId);

    DayOfWeek getDayNo();
    void setDayNo(DayOfWeek dayNo);

    String getLabel();

}
