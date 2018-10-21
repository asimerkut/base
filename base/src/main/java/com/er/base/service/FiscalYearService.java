package com.er.base.service;

import com.er.base.domain.FiscalYear;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FiscalYear.
 */
public interface FiscalYearService {

    /**
     * Save a fiscalYear.
     *
     * @param fiscalYear the entity to save
     * @return the persisted entity
     */
    FiscalYear save(FiscalYear fiscalYear);

    /**
     * Get all the fiscalYears.
     *
     * @return the list of entities
     */
    List<FiscalYear> findAll();


    /**
     * Get the "id" fiscalYear.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FiscalYear> findOne(Long id);

    /**
     * Delete the "id" fiscalYear.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fiscalYear corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FiscalYear> search(String query);
}
