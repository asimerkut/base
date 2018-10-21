package com.er.base.service.impl;

import com.er.base.service.FiscalYearService;
import com.er.base.domain.FiscalYear;
import com.er.base.repository.FiscalYearRepository;
import com.er.base.repository.search.FiscalYearSearchRepository;
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
 * Service Implementation for managing FiscalYear.
 */
@Service
@Transactional
public class FiscalYearServiceImpl implements FiscalYearService {

    private final Logger log = LoggerFactory.getLogger(FiscalYearServiceImpl.class);

    private FiscalYearRepository fiscalYearRepository;

    private FiscalYearSearchRepository fiscalYearSearchRepository;

    public FiscalYearServiceImpl(FiscalYearRepository fiscalYearRepository, FiscalYearSearchRepository fiscalYearSearchRepository) {
        this.fiscalYearRepository = fiscalYearRepository;
        this.fiscalYearSearchRepository = fiscalYearSearchRepository;
    }

    /**
     * Save a fiscalYear.
     *
     * @param fiscalYear the entity to save
     * @return the persisted entity
     */
    @Override
    public FiscalYear save(FiscalYear fiscalYear) {
        log.debug("Request to save FiscalYear : {}", fiscalYear);
        FiscalYear result = fiscalYearRepository.save(fiscalYear);
        fiscalYearSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the fiscalYears.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalYear> findAll() {
        log.debug("Request to get all FiscalYears");
        return fiscalYearRepository.findAll();
    }


    /**
     * Get one fiscalYear by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FiscalYear> findOne(Long id) {
        log.debug("Request to get FiscalYear : {}", id);
        return fiscalYearRepository.findById(id);
    }

    /**
     * Delete the fiscalYear by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FiscalYear : {}", id);
        fiscalYearRepository.deleteById(id);
        fiscalYearSearchRepository.deleteById(id);
    }

    /**
     * Search for the fiscalYear corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalYear> search(String query) {
        log.debug("Request to search FiscalYears for query {}", query);
        return StreamSupport
            .stream(fiscalYearSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
