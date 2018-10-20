package com.er.base.service.impl;

import com.er.base.service.DefRelationService;
import com.er.base.domain.DefRelation;
import com.er.base.repository.DefRelationRepository;
import com.er.base.repository.search.DefRelationSearchRepository;
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
 * Service Implementation for managing DefRelation.
 */
@Service
@Transactional
public class DefRelationServiceImpl implements DefRelationService {

    private final Logger log = LoggerFactory.getLogger(DefRelationServiceImpl.class);

    private DefRelationRepository defRelationRepository;

    private DefRelationSearchRepository defRelationSearchRepository;

    public DefRelationServiceImpl(DefRelationRepository defRelationRepository, DefRelationSearchRepository defRelationSearchRepository) {
        this.defRelationRepository = defRelationRepository;
        this.defRelationSearchRepository = defRelationSearchRepository;
    }

    /**
     * Save a defRelation.
     *
     * @param defRelation the entity to save
     * @return the persisted entity
     */
    @Override
    public DefRelation save(DefRelation defRelation) {
        log.debug("Request to save DefRelation : {}", defRelation);
        DefRelation result = defRelationRepository.save(defRelation);
        defRelationSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the defRelations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefRelation> findAll() {
        log.debug("Request to get all DefRelations");
        return defRelationRepository.findAll();
    }


    /**
     * Get one defRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DefRelation> findOne(Long id) {
        log.debug("Request to get DefRelation : {}", id);
        return defRelationRepository.findById(id);
    }

    /**
     * Delete the defRelation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefRelation : {}", id);
        defRelationRepository.deleteById(id);
        defRelationSearchRepository.deleteById(id);
    }

    /**
     * Search for the defRelation corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefRelation> search(String query) {
        log.debug("Request to search DefRelations for query {}", query);
        return StreamSupport
            .stream(defRelationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
