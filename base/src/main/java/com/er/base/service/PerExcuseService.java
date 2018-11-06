package com.er.base.service;

import com.er.base.domain.PerExcuse;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PerExcuse.
 */
public interface PerExcuseService {

    /**
     * Save a perExcuse.
     *
     * @param perExcuse the entity to save
     * @return the persisted entity
     */
    PerExcuse save(PerExcuse perExcuse);

    /**
     * Get all the perExcuses.
     *
     * @return the list of entities
     */
    List<PerExcuse> findAll();


    /**
     * Get the "id" perExcuse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerExcuse> findOne(Long id);

    /**
     * Delete the "id" perExcuse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perExcuse corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PerExcuse> search(String query);
}
