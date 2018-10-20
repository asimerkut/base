package com.er.base.service.impl;

import com.er.base.service.FiscalPeriodService;
import com.er.base.domain.FiscalPeriod;
import com.er.base.repository.FiscalPeriodRepository;
import com.er.base.repository.search.FiscalPeriodSearchRepository;
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
 * Service Implementation for managing FiscalPeriod.
 */
@Service
@Transactional
public class FiscalPeriodServiceImpl implements FiscalPeriodService {

    private final Logger log = LoggerFactory.getLogger(FiscalPeriodServiceImpl.class);

    private FiscalPeriodRepository fiscalPeriodRepository;

    private FiscalPeriodSearchRepository fiscalPeriodSearchRepository;

    public FiscalPeriodServiceImpl(FiscalPeriodRepository fiscalPeriodRepository, FiscalPeriodSearchRepository fiscalPeriodSearchRepository) {
        this.fiscalPeriodRepository = fiscalPeriodRepository;
        this.fiscalPeriodSearchRepository = fiscalPeriodSearchRepository;
    }

    /**
     * Save a fiscalPeriod.
     *
     * @param fiscalPeriod the entity to save
     * @return the persisted entity
     */
    @Override
    public FiscalPeriod save(FiscalPeriod fiscalPeriod) {
        log.debug("Request to save FiscalPeriod : {}", fiscalPeriod);
        FiscalPeriod result = fiscalPeriodRepository.save(fiscalPeriod);
        fiscalPeriodSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the fiscalPeriods.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalPeriod> findAll() {
        log.debug("Request to get all FiscalPeriods");
        return fiscalPeriodRepository.findAll();
    }


    /**
     * Get one fiscalPeriod by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FiscalPeriod> findOne(Long id) {
        log.debug("Request to get FiscalPeriod : {}", id);
        return fiscalPeriodRepository.findById(id);
    }

    /**
     * Delete the fiscalPeriod by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FiscalPeriod : {}", id);
        fiscalPeriodRepository.deleteById(id);
        fiscalPeriodSearchRepository.deleteById(id);
    }

    /**
     * Search for the fiscalPeriod corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalPeriod> search(String query) {
        log.debug("Request to search FiscalPeriods for query {}", query);
        return StreamSupport
            .stream(fiscalPeriodSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
