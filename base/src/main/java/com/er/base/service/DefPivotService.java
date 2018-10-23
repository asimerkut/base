package com.er.base.service;

import com.er.base.domain.DefPivot;
import com.er.fin.dto.PivotDataDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DefPivot.
 */
public interface DefPivotService {

    /**
     * Save a defPivot.
     *
     * @param defPivot the entity to save
     * @return the persisted entity
     */
    DefPivot save(DefPivot defPivot);

    /**
     * Get all the defPivots.
     *
     * @return the list of entities
     */
    List<DefPivot> findAll();


    /**
     * Get the "id" defPivot.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DefPivot> findOne(Long id);

    /**
     * Delete the "id" defPivot.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the defPivot corresponding to the query.
     *
     * @param query the query of the search
     *
     * @return the list of entities
     */
    List<DefPivot> search(String query);

    PivotDataDTO getSqlData(String sql);
}
