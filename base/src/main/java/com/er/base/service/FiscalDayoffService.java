package com.er.base.service;

import com.er.base.domain.FiscalDayoff;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FiscalDayoff.
 */
public interface FiscalDayoffService {

    /**
     * Save a fiscalDayoff.
     *
     * @param fiscalDayoff the entity to save
     * @return the persisted entity
     */
    FiscalDayoff save(FiscalDayoff fiscalDayoff);

    /**
     * Get all the fiscalDayoffs.
     *
     * @return the list of entities
     */
    List<FiscalDayoff> findAll();


    /**
     * Get the "id" fiscalDayoff.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FiscalDayoff> findOne(Long id);

    /**
     * Delete the "id" fiscalDayoff.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fiscalDayoff corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FiscalDayoff> search(String query);
}
