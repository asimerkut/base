package com.er.base.service;

import com.er.base.domain.PerPerson;
import com.er.base.domain.PerValue;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service Interface for managing PerValue.
 */
public interface PerValueService {

    /**
     * Save a perValue.
     *
     * @param perValue the entity to save
     * @return the persisted entity
     */
    PerValue save(PerValue perValue);

    /**
     * Get all the perValues.
     *
     * @return the list of entities
     */
    List<PerValue> findAll();


    /**
     * Get the "id" perValue.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerValue> findOne(Long id);

    /**
     * Delete the "id" perValue.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perValue corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<PerValue> search(String query);

    LinkedHashSet<PerValue> findAllByPerson(PerPerson perPerson);

}
