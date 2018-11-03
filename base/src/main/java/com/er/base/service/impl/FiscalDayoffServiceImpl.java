package com.er.base.service.impl;

import com.er.base.service.FiscalDayoffService;
import com.er.base.domain.FiscalDayoff;
import com.er.base.repository.FiscalDayoffRepository;
import com.er.base.repository.search.FiscalDayoffSearchRepository;
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
 * Service Implementation for managing FiscalDayoff.
 */
@Service
@Transactional
public class FiscalDayoffServiceImpl implements FiscalDayoffService {

    private final Logger log = LoggerFactory.getLogger(FiscalDayoffServiceImpl.class);

    private FiscalDayoffRepository fiscalDayoffRepository;

    private FiscalDayoffSearchRepository fiscalDayoffSearchRepository;

    public FiscalDayoffServiceImpl(FiscalDayoffRepository fiscalDayoffRepository, FiscalDayoffSearchRepository fiscalDayoffSearchRepository) {
        this.fiscalDayoffRepository = fiscalDayoffRepository;
        this.fiscalDayoffSearchRepository = fiscalDayoffSearchRepository;
    }

    /**
     * Save a fiscalDayoff.
     *
     * @param fiscalDayoff the entity to save
     * @return the persisted entity
     */
    @Override
    public FiscalDayoff save(FiscalDayoff fiscalDayoff) {
        log.debug("Request to save FiscalDayoff : {}", fiscalDayoff);
        FiscalDayoff result = fiscalDayoffRepository.save(fiscalDayoff);
        fiscalDayoffSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the fiscalDayoffs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalDayoff> findAll() {
        log.debug("Request to get all FiscalDayoffs");
        return fiscalDayoffRepository.findAll();
    }


    /**
     * Get one fiscalDayoff by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FiscalDayoff> findOne(Long id) {
        log.debug("Request to get FiscalDayoff : {}", id);
        return fiscalDayoffRepository.findById(id);
    }

    /**
     * Delete the fiscalDayoff by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FiscalDayoff : {}", id);
        fiscalDayoffRepository.deleteById(id);
        fiscalDayoffSearchRepository.deleteById(id);
    }

    /**
     * Search for the fiscalDayoff corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FiscalDayoff> search(String query) {
        log.debug("Request to search FiscalDayoffs for query {}", query);
        return StreamSupport
            .stream(fiscalDayoffSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
