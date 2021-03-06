package com.er.base.service.impl;

import com.er.base.service.PerExcuseService;
import com.er.base.domain.PerExcuse;
import com.er.base.repository.PerExcuseRepository;
import com.er.base.repository.search.PerExcuseSearchRepository;
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
 * Service Implementation for managing PerExcuse.
 */
@Service
@Transactional
public class PerExcuseServiceImpl implements PerExcuseService {

    private final Logger log = LoggerFactory.getLogger(PerExcuseServiceImpl.class);

    private PerExcuseRepository perExcuseRepository;

    private PerExcuseSearchRepository perExcuseSearchRepository;

    public PerExcuseServiceImpl(PerExcuseRepository perExcuseRepository, PerExcuseSearchRepository perExcuseSearchRepository) {
        this.perExcuseRepository = perExcuseRepository;
        this.perExcuseSearchRepository = perExcuseSearchRepository;
    }

    /**
     * Save a perExcuse.
     *
     * @param perExcuse the entity to save
     * @return the persisted entity
     */
    @Override
    public PerExcuse save(PerExcuse perExcuse) {
        log.debug("Request to save PerExcuse : {}", perExcuse);
        PerExcuse result = perExcuseRepository.save(perExcuse);
        perExcuseSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perExcuses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerExcuse> findAll() {
        log.debug("Request to get all PerExcuses");
        return perExcuseRepository.findAll();
    }


    /**
     * Get one perExcuse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerExcuse> findOne(Long id) {
        log.debug("Request to get PerExcuse : {}", id);
        return perExcuseRepository.findById(id);
    }

    /**
     * Delete the perExcuse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerExcuse : {}", id);
        perExcuseRepository.deleteById(id);
        perExcuseSearchRepository.deleteById(id);
    }

    /**
     * Search for the perExcuse corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerExcuse> search(String query) {
        log.debug("Request to search PerExcuses for query {}", query);
        return StreamSupport
            .stream(perExcuseSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
