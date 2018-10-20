package com.er.base.service;

import com.er.base.domain.PerPlan;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PerPlan.
 */
public interface PerPlanService {

    /**
     * Save a perPlan.
     *
     * @param perPlan the entity to save
     * @return the persisted entity
     */
    PerPlan save(PerPlan perPlan);

    /**
     * Get all the perPlans.
     *
     * @return the list of entities
     */
    List<PerPlan> findAll();


    /**
     * Get the "id" perPlan.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PerPlan> findOne(Long id);

    /**
     * Delete the "id" perPlan.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the perPlan corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PerPlan> search(String query);
}
