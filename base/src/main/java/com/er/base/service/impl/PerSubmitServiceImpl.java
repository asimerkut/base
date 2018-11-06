package com.er.base.service.impl;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerPerson;
import com.er.base.service.PerPersonService;
import com.er.base.service.PerSubmitService;
import com.er.base.domain.PerSubmit;
import com.er.base.repository.PerSubmitRepository;
import com.er.base.repository.search.PerSubmitSearchRepository;
import com.er.fin.dto.PerScheduleDTO;
import com.er.fin.dto.SchKeyDateDTO;
import com.er.fin.dto.SchKeyWeekDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PerSubmit.
 */
@Service
@Transactional
public class PerSubmitServiceImpl implements PerSubmitService {

    private final Logger log = LoggerFactory.getLogger(PerSubmitServiceImpl.class);

    private PerSubmitRepository perSubmitRepository;

    private PerSubmitSearchRepository perSubmitSearchRepository;

    private PerPersonService perPersonService;


    public PerSubmitServiceImpl(PerSubmitRepository perSubmitRepository, PerSubmitSearchRepository perSubmitSearchRepository, PerPersonService perPersonService) {
        this.perSubmitRepository = perSubmitRepository;
        this.perSubmitSearchRepository = perSubmitSearchRepository;
        this.perPersonService = perPersonService;
    }

    /**
     * Save a perSubmit.
     *
     * @param perSubmit the entity to save
     * @return the persisted entity
     */
    @Override
    public PerSubmit save(PerSubmit perSubmit) {
        log.debug("Request to save PerSubmit : {}", perSubmit);
        PerSubmit result = perSubmitRepository.save(perSubmit);
        perSubmitSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perSubmits.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerSubmit> findAll() {
        log.debug("Request to get all PerSubmits");
        return perSubmitRepository.findAll();
    }


    /**
     * Get one perSubmit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerSubmit> findOne(Long id) {
        log.debug("Request to get PerSubmit : {}", id);
        return perSubmitRepository.findById(id);
    }

    /**
     * Delete the perSubmit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerSubmit : {}", id);
        perSubmitRepository.deleteById(id);
        perSubmitSearchRepository.deleteById(id);
    }

    /**
     * Search for the perSubmit corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerSubmit> search(String query) {
        log.debug("Request to search PerSubmits for query {}", query);
        return StreamSupport
            .stream(perSubmitSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }



}
