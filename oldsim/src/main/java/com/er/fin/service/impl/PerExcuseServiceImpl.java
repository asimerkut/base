package com.er.fin.service.impl;

import com.er.fin.domain.PerExcuse;
import com.er.fin.repository.PerExcuseRepository;
import com.er.fin.service.PerExcuseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing PerExcuse.
 */
@Service
@Transactional
public class PerExcuseServiceImpl implements PerExcuseService {

    private final Logger log = LoggerFactory.getLogger(PerExcuseServiceImpl.class);

    private final PerExcuseRepository perExcuseRepository;

    public PerExcuseServiceImpl(PerExcuseRepository perExcuseRepository) {
        this.perExcuseRepository = perExcuseRepository;
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
    public PerExcuse findOne(Long id) {
        log.debug("Request to get PerExcuse : {}", id);
        return perExcuseRepository.findOne(id);
    }

    /**
     * Delete the perExcuse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerExcuse : {}", id);
        perExcuseRepository.delete(id);
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
        return null;
    }


    @Override
    @Transactional(readOnly = true)
    public List<PerExcuse> getPersonExcuse(){
        return perExcuseRepository.getPersonExcuse();
    }

}
