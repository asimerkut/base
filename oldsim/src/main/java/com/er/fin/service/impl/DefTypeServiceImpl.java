package com.er.fin.service.impl;

import com.er.fin.domain.DefType;
import com.er.fin.repository.DefTypeRepository;
import com.er.fin.service.DefTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing DefType.
 */
@Service
@Transactional
public class DefTypeServiceImpl implements DefTypeService {

    private final Logger log = LoggerFactory.getLogger(DefTypeServiceImpl.class);

    private final DefTypeRepository defTypeRepository;

    public DefTypeServiceImpl(DefTypeRepository defTypeRepository) {
        this.defTypeRepository = defTypeRepository;
    }

    /**
     * Save a defType.
     *
     * @param defType the entity to save
     * @return the persisted entity
     */
    @Override
    public DefType save(DefType defType) {
        log.debug("Request to save DefType : {}", defType);
        DefType result = defTypeRepository.save(defType);
        return result;
    }

    /**
     * Get all the defTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefType> findAll() {
        log.debug("Request to get all DefTypes");
        return defTypeRepository.findAll();
    }

    /**
     * Get one defType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DefType findOne(Long id) {
        log.debug("Request to get DefType : {}", id);
        return defTypeRepository.findOne(id);
    }

    /**
     * Delete the defType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefType : {}", id);
        defTypeRepository.delete(id);
    }

    /**
     * Search for the defType corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefType> search(String query) {
        log.debug("Request to search DefTypes for query {}", query);
        return null;
    }
}
