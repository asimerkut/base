package com.er.fin.domain;

import com.er.base.domain.PerDaily;
import com.er.base.domain.PerExcuse;
import com.er.fin.dto.PerScheduleDTO;
import com.er.fin.dto.SchKeyDateDTO;
import com.er.fin.dto.ScheduleEventDTO;
import org.springframework.beans.factory.annotation.Qualifier;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ScheduleUtilService {

    List<ScheduleEventDTO> getFullMatrixDate(Map<SchKeyDateDTO, PerScheduleDTO> weekDersMap, Map<Integer, PerDaily> dailyMap, List<PerExcuse> excuseList, LocalDate viewStart, LocalDate viewEnd);

}
