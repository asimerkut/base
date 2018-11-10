package com.er.base.service;

import com.er.base.domain.DefField;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DefField.
 */
public interface DefFieldService {

    /**
     * Save a defField.
     *
     * @param defField the entity to save
     * @return the persisted entity
     */
    DefField save(DefField defField);

    /**
     * Get all the defFields.
     *
     * @return the list of entities
     */
    List<DefField> findAll();


    /**
     * Get the "id" defField.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DefField> findOne(Long id);

    /**
     * Delete the "id" defField.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the defField corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<DefField> search(String query);

    List<DefField> findAllByTabName(String tabName);

}
