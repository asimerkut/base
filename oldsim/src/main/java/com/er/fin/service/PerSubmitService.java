package com.er.fin.service;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.PerSubmit;
import com.er.fin.service.dto.PerScheduleDTO;
import com.er.fin.service.dto.SchKeyDateDTO;
import com.er.fin.service.dto.SchKeyWeekDTO;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Service Interface for managing PerSubmit.
 */
public interface PerSubmitService {

    /**
     * Save a perSubmit.
     *
     * @param perSubmit the entity to save
     * @return the persisted entity
     */
    PerSubmit save(PerSubmit perSubmit);

    /**
     * Get all the perSubmits.
     *
     * @return the list of entities
     */
    List<PerSubmit> findAll();

    /**
     * Get the "id" perSubmit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PerSubmit findOne(Long id);

    /**
     * Delete the "id" perSubmit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perSubmit corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    List<PerSubmit> search(String query);

    Map<SchKeyDateDTO, PerScheduleDTO> getSubmitWiewMap(LocalDate viewStart, LocalDate viewEnd);

    void submitInit(Map<SchKeyWeekDTO, PerScheduleDTO> weekDersMap, LocalDate viewStart, LocalDate viewEnd);

    PerSubmit getSubmitUnique(LocalDate submitDate, Integer dersSira, DefItem ders);

}
