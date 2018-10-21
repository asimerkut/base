package com.er.fin.service.impl;

import com.er.fin.domain.PerPerson;
import com.er.fin.domain.User;
import com.er.fin.domain.enumeration.EnmSozlesme;
import com.er.fin.repository.PerPersonRepository;
import com.er.fin.service.PerPersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing PerPerson.
 */
@Service
@Transactional
public class PerPersonServiceImpl implements PerPersonService {

    private final Logger log = LoggerFactory.getLogger(PerPersonServiceImpl.class);

    private final PerPersonRepository perPersonRepository;

    public PerPersonServiceImpl(PerPersonRepository perPersonRepository) {
        this.perPersonRepository = perPersonRepository;
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
    public PerPerson findOne(Long id) {
        log.debug("Request to get PerPerson : {}", id);
        return perPersonRepository.findOne(id);
    }

    /**
     * Delete the perPerson by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerPerson : {}", id);
        perPersonRepository.delete(id);
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
        return null;
    }

    /*
    @Override
    @Transactional(readOnly = true)
    public List<PerPerson> findByUserIsCurrentUser(){
        return perPersonRepository.findByUserIsCurrentUser();
    }
    */

    @Override
    @Transactional(readOnly = true)
    public PerPerson getPerson(){
        return perPersonRepository.getPerson();
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
