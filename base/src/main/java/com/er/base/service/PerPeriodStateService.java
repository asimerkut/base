package com.er.base.service;

import com.er.base.domain.PerExcuse;
import com.er.base.domain.PerPeriodState;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PerPeriodState.
 */
public interface PerPeriodStateService {

    /**
     * Save a perPeriodState.
     *
     * @param perPeriodState the entity to save
     * @return the persisted entity
     */
    PerPeriodState save(PerPeriodState perPeriodState);

    /**
     * Get all the perPeriodStates.
     *
     * @return the list of entities
     */
    List<PerPeriodState> findAll();


    /**
     * Get the "id" perPeriodState.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerPeriodState> findOne(Long id);

    /**
     * Delete the "id" perPeriodState.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perPeriodState corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<PerPeriodState> search(String query);

    List<PerPeriodState> getPersonPeriodState();

}
