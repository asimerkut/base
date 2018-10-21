package com.er.fin.service.impl;

import com.er.fin.domain.DefRelation;
import com.er.fin.repository.DefRelationRepository;
import com.er.fin.service.DefRelationService;
import com.er.fin.service.dto.FinUtil;
import com.er.fin.web.rest.util.JsonUtil;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service Implementation for managing DefRelation.
 */
@Service
@Transactional
public class DefRelationServiceImpl implements DefRelationService {

    private final Logger log = LoggerFactory.getLogger(DefRelationServiceImpl.class);

    private final DefRelationRepository defRelationRepository;

    public DefRelationServiceImpl(DefRelationRepository defRelationRepository) {
        this.defRelationRepository = defRelationRepository;
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
    public DefRelation findOne(Long id) {
        log.debug("Request to get DefRelation : {}", id);
        return defRelationRepository.findOne(id);
    }

    /**
     * Delete the defRelation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefRelation : {}", id);
        defRelationRepository.delete(id);
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
        JSONObject json = JsonUtil.getJsonObject(query);
        Long selId = JsonUtil.getValueLong(json,"selId");
        List<DefRelation> result = new ArrayList<>();
        if (selId != null) {
            result = defRelationRepository.findAllByTypeSourceId(selId);
        }
        return result;
    }
}
