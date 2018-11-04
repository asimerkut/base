package com.er.base.service.impl;

import com.er.base.domain.PerExcuse;
import com.er.base.service.PerPeriodStateService;
import com.er.base.domain.PerPeriodState;
import com.er.base.repository.PerPeriodStateRepository;
import com.er.base.repository.search.PerPeriodStateSearchRepository;
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
 * Service Implementation for managing PerPeriodState.
 */
@Service
@Transactional
public class PerPeriodStateServiceImpl implements PerPeriodStateService {

    private final Logger log = LoggerFactory.getLogger(PerPeriodStateServiceImpl.class);

    private PerPeriodStateRepository perPeriodStateRepository;

    private PerPeriodStateSearchRepository perPeriodStateSearchRepository;

    public PerPeriodStateServiceImpl(PerPeriodStateRepository perPeriodStateRepository, PerPeriodStateSearchRepository perPeriodStateSearchRepository) {
        this.perPeriodStateRepository = perPeriodStateRepository;
        this.perPeriodStateSearchRepository = perPeriodStateSearchRepository;
    }

    /**
     * Save a perPeriodState.
     *
     * @param perPeriodState the entity to save
     * @return the persisted entity
     */
    @Override
    public PerPeriodState save(PerPeriodState perPeriodState) {
        log.debug("Request to save PerPeriodState : {}", perPeriodState);
        PerPeriodState result = perPeriodStateRepository.save(perPeriodState);
        perPeriodStateSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perPeriodStates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPeriodState> findAll() {
        log.debug("Request to get all PerPeriodStates");
        return perPeriodStateRepository.findAll();
    }


    /**
     * Get one perPeriodState by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerPeriodState> findOne(Long id) {
        log.debug("Request to get PerPeriodState : {}", id);
        return perPeriodStateRepository.findById(id);
    }

    /**
     * Delete the perPeriodState by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerPeriodState : {}", id);
        perPeriodStateRepository.deleteById(id);
        perPeriodStateSearchRepository.deleteById(id);
    }

    /**
     * Search for the perPeriodState corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPeriodState> search(String query) {
        log.debug("Request to search PerPeriodStates for query {}", query);
        return StreamSupport
            .stream(perPeriodStateSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerPeriodState> getPersonPeriodState(){
        return perPeriodStateRepository.getPersonPeriodState();
    }

}
