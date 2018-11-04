package com.er.base.service.impl;

import com.er.base.domain.User;
import com.er.base.domain.enumeration.EnmSozlesme;
import com.er.base.service.PerPersonService;
import com.er.base.domain.PerPerson;
import com.er.base.repository.PerPersonRepository;
import com.er.base.repository.search.PerPersonSearchRepository;
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
 * Service Implementation for managing PerPerson.
 */
@Service
@Transactional
public class PerPersonServiceImpl implements PerPersonService {

    private final Logger log = LoggerFactory.getLogger(PerPersonServiceImpl.class);

    private PerPersonRepository perPersonRepository;

    private PerPersonSearchRepository perPersonSearchRepository;

    public PerPersonServiceImpl(PerPersonRepository perPersonRepository, PerPersonSearchRepository perPersonSearchRepository) {
        this.perPersonRepository = perPersonRepository;
        this.perPersonSearchRepository = perPersonSearchRepository;
    }

    /**
     * Save a perPerson.
     *
     * @param perPerson the entity to save
     * @return the persisted entity
     */
    @Override
    public PerPerson save(PerPerson perPerson) {
        log.debug("Request to save PerPerson : {}", perPerson);
        PerPerson result = perPersonRepository.save(perPerson);
        perPersonSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perPeople.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPerson> findAll() {
        log.debug("Request to get all PerPeople");
        return perPersonRepository.findAll();
    }


    /**
     * Get one perPerson by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerPerson> findOne(Long id) {
        log.debug("Request to get PerPerson : {}", id);
        return perPersonRepository.findById(id);
    }

    /**
     * Delete the perPerson by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerPerson : {}", id);
        perPersonRepository.deleteById(id);
        perPersonSearchRepository.deleteById(id);
    }

    /**
     * Search for the perPerson corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPerson> search(String query) {
        log.debug("Request to search PerPeople for query {}", query);
        return StreamSupport
            .stream(perPersonSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PerPerson getLoginPerson(){
        return perPersonRepository.getLoginPerson();
    }

    @Override
    @Transactional(readOnly = false)
    public PerPerson registerPerson(User user){
        PerPerson per = new PerPerson();
        per.setUser(user);
        per.setCode(user.getLogin());
        per.setName(user.getLogin());
        per.setEmail(user.getEmail());
        per.setIsActive(true);
        per.setSozlesme(EnmSozlesme.KADRO);
        per = perPersonRepository.save(per);
        return per;
    }
}
