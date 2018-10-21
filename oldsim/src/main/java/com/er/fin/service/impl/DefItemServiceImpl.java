package com.er.fin.service.impl;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.enumeration.EnmType;
import com.er.fin.repository.DefItemRepository;
import com.er.fin.service.DefItemService;
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
 * Service Implementation for managing DefItem.
 */
@Service
@Transactional
public class DefItemServiceImpl implements DefItemService {

    private final Logger log = LoggerFactory.getLogger(DefItemServiceImpl.class);

    private final DefItemRepository defItemRepository;

    public DefItemServiceImpl(DefItemRepository defItemRepository) {
        this.defItemRepository = defItemRepository;
    }

    /**
     * Save a defItem.
     *
     * @param defItem the entity to save
     * @return the persisted entity
     */
    @Override
    public DefItem save(DefItem defItem) {
        log.debug("Request to save DefItem : {}", defItem);
        DefItem result = defItemRepository.save(defItem);
        return result;
    }

    /**
     * Get all the defItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefItem> findAll() {
        log.debug("Request to get all DefItems");
        return defItemRepository.findAll();
    }

    /**
     * Get one defItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DefItem findOne(Long id) {
        log.debug("Request to get DefItem : {}", id);
        return defItemRepository.findOne(id);
    }

    /**
     * Delete the defItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefItem : {}", id);
        defItemRepository.delete(id);
    }

    /**
     * Search for the defItem corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefItem> search(String query) {
        log.debug("Request to search for a page of DefItems for query {}", query);
        //pageable = FinUtil.getPageParam();
        JSONObject json = JsonUtil.getJsonObject(query);
        Long selId = JsonUtil.getValueLong(json,"selId");

        List<DefItem> result = new ArrayList<>();
        if (selId!=null){
            result = defItemRepository.findAllByTypeIdOrderByCode(selId);
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DefItem> findAllByTypeId(EnmType enmType) {
        log.debug("Request to get all DefItems");
        return defItemRepository.findAllByTypeCodeOrderByCode(enmType);
    }

}
