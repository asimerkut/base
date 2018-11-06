package com.er.base.service.impl;

import com.er.base.service.PerDailyService;
import com.er.base.domain.PerDaily;
import com.er.base.repository.PerDailyRepository;
import com.er.base.repository.search.PerDailySearchRepository;
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
 * Service Implementation for managing PerDaily.
 */
@Service
@Transactional
public class PerDailyServiceImpl implements PerDailyService {

    private final Logger log = LoggerFactory.getLogger(PerDailyServiceImpl.class);

    private PerDailyRepository perDailyRepository;

    private PerDailySearchRepository perDailySearchRepository;

    public PerDailyServiceImpl(PerDailyRepository perDailyRepository, PerDailySearchRepository perDailySearchRepository) {
        this.perDailyRepository = perDailyRepository;
        this.perDailySearchRepository = perDailySearchRepository;
    }

    /**
     * Save a perDaily.
     *
     * @param perDaily the entity to save
     * @return the persisted entity
     */
    @Override
    public PerDaily save(PerDaily perDaily) {
        log.debug("Request to save PerDaily : {}", perDaily);
        PerDaily result = perDailyRepository.save(perDaily);
        perDailySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perDailies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> findAll() {
        log.debug("Request to get all PerDailies");
        return perDailyRepository.findAll();
    }


    /**
     * Get one perDaily by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerDaily> findOne(Long id) {
        log.debug("Request to get PerDaily : {}", id);
        return perDailyRepository.findById(id);
    }

    /**
     * Delete the perDaily by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerDaily : {}", id);
        perDailyRepository.deleteById(id);
        perDailySearchRepository.deleteById(id);
    }

    /**
     * Search for the perDaily corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> search(String query) {
        log.debug("Request to search PerDailies for query {}", query);
        return StreamSupport
            .stream(perDailySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
