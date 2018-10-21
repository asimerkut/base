package com.er.fin.service.impl;

import com.er.fin.domain.PerCompany;
import com.er.fin.domain.PerDaily;
import com.er.fin.repository.PerCompanyRepository;
import com.er.fin.repository.PerDailyRepository;
import com.er.fin.service.PerDailyService;
import com.er.fin.service.dto.FinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Service Implementation for managing PerDaily.
 */
@Service
@Transactional
public class PerDailyServiceImpl implements PerDailyService {

    private final Logger log = LoggerFactory.getLogger(PerDailyServiceImpl.class);

    private final PerDailyRepository perDailyRepository;
    private final PerCompanyRepository perCompanyRepository;

    public PerDailyServiceImpl(PerDailyRepository perDailyRepository, PerCompanyRepository perCompanyRepository) {
        this.perDailyRepository = perDailyRepository;
        this.perCompanyRepository = perCompanyRepository;
    }

    /**
     * Save a perDaily.
     *
     * @param perDaily the entity to save
     * @return the persisted entity
     */
    @Override
    public PerDaily save(PerDaily perDaily) {
        log.debug("Request to save PerDaily : {}", perDaily);
        PerDaily result = perDailyRepository.save(perDaily);
        return result;
    }

    /**
     * Get all the perDailies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> findAll() {
        log.debug("Request to get all PerDailies");
        return perDailyRepository.findAll();
    }

    /**
     * Get one perDaily by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PerDaily findOne(Long id) {
        log.debug("Request to get PerDaily : {}", id);
        return perDailyRepository.findOne(id);
    }

    /**
     * Delete the perDaily by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerDaily : {}", id);
        perDailyRepository.delete(id);
    }

    /**
     * Search for the perDaily corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> search(String query) {
        log.debug("Request to search PerDailies for query {}", query);
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Integer, PerDaily> findAllByOkul(PerCompany okul){
        Map<Integer, PerDaily> map = new HashMap<>();
        //List<PerDaily> list = perDailyRepository.findAllByOkulOrderByDersSira(okul);
        //for (PerDaily d : list){
        //    map.put(d.getDersSira(), d);
        //}
        int oo = okul.getMesaiOo();
        int os = oo+okul.getMesaiOs();
        int gc = os+okul.getMesaiGc();
        for (int i=1;i<=oo;i++){
            map.put(i, getDaily(i, okul));
        }
        for (int i=oo+1;i<=os;i++){
            map.put(i, getDaily(i, okul));
        }
        for (int i=os+1;i<=gc;i++){
            map.put(i, getDaily(i, okul));
        }
        return map;
    }

    private PerDaily getDaily(int i, PerCompany okul){
        PerDaily d = new PerDaily();
        d.setId(new Long(i));
        d.dersSira(i);
        d.setOkul(okul);
        d.setHourStart(FinUtil.LPad(new Long(i).toString(),2,'0')+":01");
        d.setHourFinish(FinUtil.LPad(new Long ((i)).toString(),2,'0')+":59");
        return d;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> findAllByOkulList(Long okulId){
        PerCompany okul = perCompanyRepository.findOne(okulId);
        List<PerDaily> list = perDailyRepository.findAllByOkulOrderByDersSira(okul);
        return list;
    }


}
