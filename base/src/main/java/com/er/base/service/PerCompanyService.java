package com.er.base.service;

import com.er.base.domain.PerCompany;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PerCompany.
 */
public interface PerCompanyService {

    /**
     * Save a perCompany.
     *
     * @param perCompany the entity to save
     * @return the persisted entity
     */
    PerCompany save(PerCompany perCompany);

    /**
     * Get all the perCompanies.
     *
     * @return the list of entities
     */
    List<PerCompany> findAll();


    /**
     * Get the "id" perCompany.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerCompany> findOne(Long id);

    /**
     * Delete the "id" perCompany.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perCompany corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PerCompany> search(String query);
}
