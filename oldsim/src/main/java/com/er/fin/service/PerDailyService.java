package com.er.fin.service;

import com.er.fin.domain.PerCompany;
import com.er.fin.domain.PerDaily;

import java.util.List;
import java.util.Map;

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
    PerDaily findOne(Long id);

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

    Map<Integer, PerDaily> findAllByOkul(PerCompany okul);

    List<PerDaily> findAllByOkulList(Long okulId);

}
