package com.er.base.service.impl;

import com.er.base.domain.*;
import com.er.base.service.DefFieldService;
import com.er.base.service.DefTypeService;
import com.er.base.service.PerValueService;
import com.er.base.repository.PerValueRepository;
import com.er.base.repository.search.PerValueSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PerValue.
 */
@Service
@Transactional
public class PerValueServiceImpl implements PerValueService {

    private final Logger log = LoggerFactory.getLogger(PerValueServiceImpl.class);

    private PerValueRepository perValueRepository;

    private PerValueSearchRepository perValueSearchRepository;

    private DefTypeService defTypeService;

    private DefFieldService defFieldService;

    public PerValueServiceImpl(PerValueRepository perValueRepository, PerValueSearchRepository perValueSearchRepository, DefTypeService defTypeService, DefFieldService defFieldService) {
        this.perValueRepository = perValueRepository;
        this.perValueSearchRepository = perValueSearchRepository;
        this.defTypeService = defTypeService;
        this.defFieldService = defFieldService;
    }

    /**
     * Save a perValue.
     *
     * @param perValue the entity to save
     * @return the persisted entity
     */
    @Override
    public PerValue save(PerValue perValue) {
        log.debug("Request to save PerValue : {}", perValue);
        PerValue result = perValueRepository.save(perValue);
        perValueSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perValues.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerValue> findAll() {
        log.debug("Request to get all PerValues");
        return perValueRepository.findAll();
    }


    /**
     * Get one perValue by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerValue> findOne(Long id) {
        log.debug("Request to get PerValue : {}", id);
        return perValueRepository.findById(id);
    }

    /**
     * Delete the perValue by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerValue : {}", id);
        perValueRepository.deleteById(id);
        perValueSearchRepository.deleteById(id);
    }

    /**
     * Search for the perValue corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerValue> search(String query) {
        log.debug("Request to search PerValues for query {}", query);
        return StreamSupport
            .stream(perValueSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public LinkedHashSet<PerValue> findAllByPerson(PerPerson perPerson){
        Set<PerValue> valSet = perValueRepository.findAllByPerson(perPerson);
        List<DefField> fieldList = defFieldService.findAllByTabName(DefField.TAB_NAME);
        LinkedHashSet<PerValue> newSet = new LinkedHashSet<>();
        for (DefField fld : fieldList){
            addToList(newSet, valSet, fld.getSelType(),fld.getGrpName(), fld.getFldCaption());
        }
        return newSet;
    }

    private void addToList(LinkedHashSet<PerValue> list, Set<PerValue> valSet, DefType enmType, String grp, String cap){
        PerValue val = null;
        for (PerValue value : valSet){
            if (enmType==null || value.getValType().getId().equals(enmType.getId())){
                val = value;
                break;
            }
        }
        if (val==null){
            val = new PerValue();
            val.setValType(enmType);
        }
        if (val.getValItem()==null){
            val.setValItem(new DefItem());
        }
        val.setGrp(grp);
        val.setCap(cap);
        list.add(val);
    }

}
