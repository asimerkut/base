package com.er.fin.service;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.PerPerson;
import com.er.fin.domain.PerPlan;
import com.er.fin.domain.PerSubmit;
import com.er.fin.service.dto.PerScheduleDTO;
import com.er.fin.service.dto.SchKeyWeekDTO;
import org.springframework.data.repository.query.Param;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Service Interface for managing PerPlan.
 */
public interface PerPlanService {

    /**
     * Save a perPlan.
     *
     * @param perPlan the entity to save
     * @return the persisted entity
     */
    PerPlan save(PerPlan perPlan);

    /**
     * Get all the perPlans.
     *
     * @return the list of entities
     */
    List<PerPlan> findAll();

    /**
     * Get the "id" perPlan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PerPlan findOne(Long id);

    /**
     * Delete the "id" perPlan.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perPlan corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    List<PerPlan> search(String query);

    Map<SchKeyWeekDTO, PerScheduleDTO> getPlanWeekMap(LocalDate startDate);

    List<LocalDate> getPlanDateList();

    List<PerPlan> getPlanListByPerson(PerPerson person);

    List<PerPlan> getPlanListByDateAndDay(LocalDate startDate, DayOfWeek dayOfWeek);
    List<PerPlan> getPlanListByDate(LocalDate startDate);

    PerPlan getPlanUnique(DayOfWeek dayNo, Integer dersSira, DefItem ders);
    void planDelete(PerSubmit perSubmit);
    PerPlan planSaveOrUpdate(PerSubmit perSubmit);

}
