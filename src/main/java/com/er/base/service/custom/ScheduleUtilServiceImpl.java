package com.er.fin.domain;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerDaily;
import com.er.base.domain.PerExcuse;
import com.er.base.service.PerPlanService;
import com.er.base.service.PerSubmitService;
import com.er.base.service.impl.PerPersonServiceImpl;
import com.er.fin.dto.PerScheduleDTO;
import com.er.fin.dto.SchKeyDateDTO;
import com.er.fin.dto.SchKeyWeekDTO;
import com.er.fin.dto.ScheduleEventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@Qualifier("scheduleUtilService")
public class ScheduleUtilServiceImpl implements ScheduleUtilService {

    private final Logger log = LoggerFactory.getLogger(ScheduleUtilServiceImpl.class);

    private PerPlanService perPlanService;

    private PerSubmitService perSubmitService;

    public ScheduleUtilServiceImpl(PerPlanService perPlanService, PerSubmitService perSubmitService) {
        this.perPlanService = perPlanService;
        this.perSubmitService = perSubmitService;
    }


    public String getDateWithHour(LocalDate date, String hour) {
        if (hour != null) {
            return date + "T" + hour + ":00";
        }
        return date + "";
    }

    private ScheduleEventDTO getEmptyCell(Integer i, Long cellId, LocalDate date, PerDaily d) {
        ScheduleEventDTO se = new ScheduleEventDTO(i, d.getOkul(), date.getDayOfWeek());
        se.setId(cellId);
        se.setStart(getDateWithHour(date, d.getHourStart()));
        se.setEnd(getDateWithHour(date, d.getHourFinish()));
        se.setTitle("");
        se.setDers(new DefItem(null));
        se.setCellId(cellId);
        se.setDersAdet(null);
        return se;
    }

    private ScheduleEventDTO getFullCell(Integer i, Long cellId, LocalDate date, PerDaily d, PerScheduleDTO p) {
        ScheduleEventDTO se = new ScheduleEventDTO(i, d == null ? null : d.getOkul(), date.getDayOfWeek());
        se.setId(p.getId());
        if (d != null) {
            se.setStart(getDateWithHour(date, d.getHourStart()));
            se.setEnd(getDateWithHour(date, d.getHourFinish()));
        } else {
            se.setStart(getDateWithHour(date, null));
            se.setAllDay(true);
        }
        se.setTitle(p.getLabel());
        se.setDers(new DefItem(p.getDers() == null ? null : p.getDers().getId()));
        se.setCellId(cellId);
        se.setDersAdet(p.getDersAdet());
        return se;
    }

    private ScheduleEventDTO getExcuseCell(PerExcuse ex, Map<Integer, PerDaily> dailyMap) {
        ScheduleEventDTO se = new ScheduleEventDTO(0, ex.getPerson().getOkul(), null);
        se.setId(-1L);
        se.setTitle(ex.getIzin().getName());
        se.setDers(new DefItem(null));
        se.setCellId(-1L);
        se.setBackgroundColor("rgb(255,0,0)");
        se.setBorderColor("rgb(255,0,0)");
        se.setTextColor("black");

        PerDaily startD = dailyMap.get(ex.getStartDersNo());
        PerDaily finishD = dailyMap.get(ex.getFinishDersNo());
        if (startD == null || finishD == null) {
            return se;
        }
        String start = startD.getHourStart().replace(":01", ":00");
        String finish = finishD.getHourFinish();
        se.setStart(getDateWithHour(ex.getStartDate(), start));
        se.setEnd(getDateWithHour(ex.getFinishDate(), finish));
        se.setDersAdet(null);
        return se;
    }

    private Long getCellId(LocalDate date, Integer i) {
        return new Long(-1 * ((date.getYear() * 1000000) + (date.getMonthValue() * 10000) + (date.getDayOfMonth() * 100) + i));
    }

    public List<ScheduleEventDTO> getFullMatrixWeek(Map<SchKeyWeekDTO, PerScheduleDTO> weekDersMap, Map<Integer, PerDaily> dailyMap, LocalDate viewStart, LocalDate viewEnd) {
        List<ScheduleEventDTO> scheduleList = new ArrayList<>();
        for (LocalDate date = viewStart; date.isBefore(viewEnd); date = date.plusDays(1)) {
            for (int i = -101; i < 0; i--) {
                PerDaily d = dailyMap.get(i);
                SchKeyWeekDTO key = new SchKeyWeekDTO(date.getDayOfWeek(), i);
                ScheduleEventDTO se = null;
                if (weekDersMap.containsKey(key)) {
                    PerScheduleDTO p = weekDersMap.get(key);
                    se = getFullCell(i, p.getId(), date, d, p);
                    scheduleList.add(se);
                } else {
                    i = 1;
                }
            }
            for (Integer i : dailyMap.keySet()) {
                PerDaily d = dailyMap.get(i);
                SchKeyWeekDTO key = new SchKeyWeekDTO(date.getDayOfWeek(), i);
                ScheduleEventDTO se = null;
                Long cellId = getCellId(date, i);
                if (weekDersMap.containsKey(key)) {
                    PerScheduleDTO p = weekDersMap.get(key);
                    se = getFullCell(i, cellId, date, d, p);
                } else {
                    se = getEmptyCell(i, cellId, date, d);
                }
                if (se.getDersSira().intValue() == 0) {
                    se.setAllDay(true);
                }
                scheduleList.add(se);
            }
        }
        return scheduleList;
    }

    @Override
    public List<ScheduleEventDTO> getFullMatrixDate(Map<SchKeyDateDTO, PerScheduleDTO> weekDersMap, Map<Integer, PerDaily> dailyMap, List<PerExcuse> excuseList, LocalDate viewStart, LocalDate viewEnd) {
        List<ScheduleEventDTO> scheduleList = new ArrayList<>();
        for (LocalDate date = viewStart; date.isBefore(viewEnd); date = date.plusDays(1)) {
            for (int i = -101; i < 0; i--) {
                PerDaily d = dailyMap.get(i);
                SchKeyDateDTO key = new SchKeyDateDTO(date, i);
                ScheduleEventDTO se = null;
                if (weekDersMap.containsKey(key)) {
                    PerScheduleDTO p = weekDersMap.get(key);
                    se = getFullCell(i, p.getId(), date, d, p);
                    scheduleList.add(se);
                } else {
                    i = 1;
                }
            }
            for (Integer i : dailyMap.keySet()) {
                PerDaily d = dailyMap.get(i);
                SchKeyDateDTO key = new SchKeyDateDTO(date, i);
                ScheduleEventDTO se = null;
                Long cellId = getCellId(date, i);
                if (weekDersMap.containsKey(key)) {
                    PerScheduleDTO p = weekDersMap.get(key);
                    se = getFullCell(i, cellId, date, d, p);
                } else {
                    se = getEmptyCell(i, cellId, date, d);
                }
                scheduleList.add(se);
            }
        }
        for (PerExcuse ex : excuseList) {
            ScheduleEventDTO se = getExcuseCell(ex, dailyMap);
            scheduleList.add(se);
        }

        return scheduleList;
    }
}
