package com.er.fin.service.impl;

import com.er.fin.domain.DefAnswer;
import com.er.fin.repository.DefAnswerRepository;
import com.er.fin.service.DefAnswerService;
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
 * Service Implementation for managing DefAnswer.
 */
@Service
@Transactional
public class DefAnswerServiceImpl implements DefAnswerService {

    private final Logger log = LoggerFactory.getLogger(DefAnswerServiceImpl.class);

    private final DefAnswerRepository defAnswerRepository;

    public DefAnswerServiceImpl(DefAnswerRepository defAnswerRepository) {
        this.defAnswerRepository = defAnswerRepository;
    }

    /**
     * Save a defAnswer.
     *
     * @param defAnswer the entity to save
     * @return the persisted entity
     */
    @Override
    public DefAnswer save(DefAnswer defAnswer) {
        log.debug("Request to save DefAnswer : {}", defAnswer);
        DefAnswer result = defAnswerRepository.save(defAnswer);
        return result;
    }

    /**
     * Get all the defAnswers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefAnswer> findAll() {
        log.debug("Request to get all DefAnswers");
        return defAnswerRepository.findAll();
    }

    /**
     * Get one defAnswer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DefAnswer findOne(Long id) {
        log.debug("Request to get DefAnswer : {}", id);
        return defAnswerRepository.findOne(id);
    }

    /**
     * Delete the defAnswer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefAnswer : {}", id);
        defAnswerRepository.delete(id);
    }

    /**
     * Search for the defAnswer corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefAnswer> search(String query) {
        log.debug("Request to search DefRelations for query {}", query);
        JSONObject json = JsonUtil.getJsonObject(query);
        Long selId = JsonUtil.getValueLong(json,"selId");
        List<DefAnswer> result = new ArrayList<>();
        if (selId!=null){
            result = defAnswerRepository.findAllByItemSourceId(selId);
        }
        return result;
    }
}
