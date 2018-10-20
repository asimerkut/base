package com.er.base.service;

import com.er.base.domain.FiscalPeriod;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FiscalPeriod.
 */
public interface FiscalPeriodService {

    /**
     * Save a fiscalPeriod.
     *
     * @param fiscalPeriod the entity to save
     * @return the persisted entity
     */
    FiscalPeriod save(FiscalPeriod fiscalPeriod);

    /**
     * Get all the fiscalPeriods.
     *
     * @return the list of entities
     */
    List<FiscalPeriod> findAll();


    /**
     * Get the "id" fiscalPeriod.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FiscalPeriod> findOne(Long id);

    /**
     * Delete the "id" fiscalPeriod.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fiscalPeriod corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FiscalPeriod> search(String query);
}
