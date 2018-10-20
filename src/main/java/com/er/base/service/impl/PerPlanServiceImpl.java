package com.er.base.service.impl;

import com.er.base.service.PerPlanService;
import com.er.base.domain.PerPlan;
import com.er.base.repository.PerPlanRepository;
import com.er.base.repository.search.PerPlanSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PerPlan.
 */
@Service
@Transactional
public class PerPlanServiceImpl implements PerPlanService {

    private final Logger log = LoggerFactory.getLogger(PerPlanServiceImpl.class);

    private PerPlanRepository perPlanRepository;

    private PerPlanSearchRepository perPlanSearchRepository;

    public PerPlanServiceImpl(PerPlanRepository perPlanRepository, PerPlanSearchRepository perPlanSearchRepository) {
        this.perPlanRepository = perPlanRepository;
        this.perPlanSearchRepository = perPlanSearchRepository;
    }

    /**
     * Save a perPlan.
     *
     * @param perPlan the entity to save
     * @return the persisted entity
     */
    @Override
    public PerPlan save(PerPlan perPlan) {
        log.debug("Request to save PerPlan : {}", perPlan);
        PerPlan result = perPlanRepository.save(perPlan);
        perPlanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perPlans.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> findAll() {
        log.debug("Request to get all PerPlans");
        return perPlanRepository.findAll();
    }


    /**
     * Get one perPlan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerPlan> findOne(Long id) {
        log.debug("Request to get PerPlan : {}", id);
        return perPlanRepository.findById(id);
    }

    /**
     * Delete the perPlan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerPlan : {}", id);
        perPlanRepository.deleteById(id);
        perPlanSearchRepository.deleteById(id);
    }

    /**
     * Search for the perPlan corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> search(String query) {
        log.debug("Request to search PerPlans for query {}", query);
        return StreamSupport
            .stream(perPlanSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
