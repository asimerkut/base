package com.er.base.service;

import com.er.base.domain.PerDaily;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PerDaily.
 */
public interface PerDailyService {

    /**
     * Save a perDaily.
     *
     * @param perDaily the entity to save
     * @return the persisted entity
     */
    PerDaily save(PerDaily perDaily);

    /**
     * Get all the perDailies.
     *
     * @return the list of entities
     */
    List<PerDaily> findAll();


    /**
     * Get the "id" perDaily.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerDaily> findOne(Long id);

    /**
     * Delete the "id" perDaily.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perDaily corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PerDaily> search(String query);
}
