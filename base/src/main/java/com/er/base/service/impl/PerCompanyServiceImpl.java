package com.er.base.service.impl;

import com.er.base.service.PerCompanyService;
import com.er.base.domain.PerCompany;
import com.er.base.repository.PerCompanyRepository;
import com.er.base.repository.search.PerCompanySearchRepository;
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
 * Service Implementation for managing PerCompany.
 */
@Service
@Transactional
public class PerCompanyServiceImpl implements PerCompanyService {

    private final Logger log = LoggerFactory.getLogger(PerCompanyServiceImpl.class);

    private PerCompanyRepository perCompanyRepository;

    private PerCompanySearchRepository perCompanySearchRepository;

    public PerCompanyServiceImpl(PerCompanyRepository perCompanyRepository, PerCompanySearchRepository perCompanySearchRepository) {
        this.perCompanyRepository = perCompanyRepository;
        this.perCompanySearchRepository = perCompanySearchRepository;
    }

    /**
     * Save a perCompany.
     *
     * @param perCompany the entity to save
     * @return the persisted entity
     */
    @Override
    public PerCompany save(PerCompany perCompany) {
        log.debug("Request to save PerCompany : {}", perCompany);
        PerCompany result = perCompanyRepository.save(perCompany);
        perCompanySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perCompanies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerCompany> findAll() {
        log.debug("Request to get all PerCompanies");
        return perCompanyRepository.findAll();
    }


    /**
     * Get one perCompany by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerCompany> findOne(Long id) {
        log.debug("Request to get PerCompany : {}", id);
        return perCompanyRepository.findById(id);
    }

    /**
     * Delete the perCompany by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerCompany : {}", id);
        perCompanyRepository.deleteById(id);
        perCompanySearchRepository.deleteById(id);
    }

    /**
     * Search for the perCompany corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerCompany> search(String query) {
        log.debug("Request to search PerCompanies for query {}", query);
        return StreamSupport
            .stream(perCompanySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
