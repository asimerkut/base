package com.er.base.service.impl;

import com.er.base.service.DefFieldService;
import com.er.base.domain.DefField;
import com.er.base.repository.DefFieldRepository;
import com.er.base.repository.search.DefFieldSearchRepository;
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
 * Service Implementation for managing DefField.
 */
@Service
@Transactional
public class DefFieldServiceImpl implements DefFieldService {

    private final Logger log = LoggerFactory.getLogger(DefFieldServiceImpl.class);

    private DefFieldRepository defFieldRepository;

    private DefFieldSearchRepository defFieldSearchRepository;

    public DefFieldServiceImpl(DefFieldRepository defFieldRepository, DefFieldSearchRepository defFieldSearchRepository) {
        this.defFieldRepository = defFieldRepository;
        this.defFieldSearchRepository = defFieldSearchRepository;
    }

    /**
     * Save a defField.
     *
     * @param defField the entity to save
     * @return the persisted entity
     */
    @Override
    public DefField save(DefField defField) {
        log.debug("Request to save DefField : {}", defField);
        DefField result = defFieldRepository.save(defField);
        defFieldSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the defFields.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefField> findAll() {
        log.debug("Request to get all DefFields");
        return defFieldRepository.findAll();
    }


    /**
     * Get one defField by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DefField> findOne(Long id) {
        log.debug("Request to get DefField : {}", id);
        return defFieldRepository.findById(id);
    }

    /**
     * Delete the defField by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefField : {}", id);
        defFieldRepository.deleteById(id);
        defFieldSearchRepository.deleteById(id);
    }

    /**
     * Search for the defField corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefField> search(String query) {
        log.debug("Request to search DefFields for query {}", query);
        return StreamSupport
            .stream(defFieldSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
