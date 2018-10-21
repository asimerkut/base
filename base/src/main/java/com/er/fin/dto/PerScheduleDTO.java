package com.er.fin.dto;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerExcuse;
import com.er.base.domain.PerPerson;
import com.er.base.domain.enumeration.EnmDersGrup;

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
