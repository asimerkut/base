package com.er.base.service.impl;

import com.er.base.service.DefAnswerService;
import com.er.base.domain.DefAnswer;
import com.er.base.repository.DefAnswerRepository;
import com.er.base.repository.search.DefAnswerSearchRepository;
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
 * Service Implementation for managing DefAnswer.
 */
@Service
@Transactional
public class DefAnswerServiceImpl implements DefAnswerService {

    private final Logger log = LoggerFactory.getLogger(DefAnswerServiceImpl.class);

    private DefAnswerRepository defAnswerRepository;

    private DefAnswerSearchRepository defAnswerSearchRepository;

    public DefAnswerServiceImpl(DefAnswerRepository defAnswerRepository, DefAnswerSearchRepository defAnswerSearchRepository) {
        this.defAnswerRepository = defAnswerRepository;
        this.defAnswerSearchRepository = defAnswerSearchRepository;
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
        defAnswerSearchRepository.save(result);
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
    public Optional<DefAnswer> findOne(Long id) {
        log.debug("Request to get DefAnswer : {}", id);
        return defAnswerRepository.findById(id);
    }

    /**
     * Delete the defAnswer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefAnswer : {}", id);
        defAnswerRepository.deleteById(id);
        defAnswerSearchRepository.deleteById(id);
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
        log.debug("Request to search DefAnswers for query {}", query);
        return StreamSupport
            .stream(defAnswerSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
