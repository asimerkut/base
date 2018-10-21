package com.er.base.service.impl;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerSubmit;
import com.er.base.service.PerPlanService;
import com.er.base.domain.PerPlan;
import com.er.base.repository.PerPlanRepository;
import com.er.base.repository.search.PerPlanSearchRepository;
import com.er.fin.dto.PerScheduleDTO;
import com.er.fin.dto.SchKeyWeekDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing PerPlan.
 */
@Service
@Transactional
public class PerPlanServiceImpl implements PerPlanService {

    private final Logger log = LoggerFactory.getLogger(PerPlanServiceImpl.class);

    private PerPlanRepository perPlanRepository;

    private PerPlanSearchRepository perPlanSearchRepository;

    public PerPlanServiceImpl(PerPlanRepository perPlanRepository, PerPlanSearchRepository perPlanSearchRepository) {
        this.perPlanRepository = perPlanRepository;
        this.perPlanSearchRepository = perPlanSearchRepository;
    }

    /**
     * Save a perPlan.
     *
     * @param perPlan the entity to save
     * @return the persisted entity
     */
    @Override
    public PerPlan save(PerPlan perPlan) {
        log.debug("Request to save PerPlan : {}", perPlan);
        PerPlan result = perPlanRepository.save(perPlan);
        perPlanSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the perPlans.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> findAll() {
        log.debug("Request to get all PerPlans");
        return perPlanRepository.findAll();
    }


    /**
     * Get one perPlan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PerPlan> findOne(Long id) {
        log.debug("Request to get PerPlan : {}", id);
        return perPlanRepository.findById(id);
    }

    /**
     * Delete the perPlan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PerPlan : {}", id);
        perPlanRepository.deleteById(id);
        perPlanSearchRepository.deleteById(id);
    }

    /**
     * Search for the perPlan corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> search(String query) {
        log.debug("Request to search PerPlans for query {}", query);
        return StreamSupport
            .stream(perPlanSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    //1 Haftalik Plan Getir
    @Override
    @Transactional(readOnly = true)
    public Map<SchKeyWeekDTO, PerScheduleDTO> getPlanWeekMap(LocalDate startDate){
        Map<SchKeyWeekDTO, PerScheduleDTO> map = new HashMap<>();
        for (DayOfWeek dof : DayOfWeek.values()){
            List<PerPlan> list = perPlanRepository.getPlanListByDateAndDay(startDate, dof);
            int i=-101;
            for(PerPlan p : list){
                int sira = p.getDersSira().intValue();
                if (sira==0){
                    sira=i--;
                }
                SchKeyWeekDTO key = new SchKeyWeekDTO(p.getDayNo(), sira);
                map.put(key, p);
            }
        }
        return map;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LocalDate> getPlanDateList(){
        return perPlanRepository.getPlanDateList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> getPlanListByPerson(PerPerson person){
        return perPlanRepository.getPlanListByPerson(person);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> getPlanListByDateAndDay(LocalDate startDate, DayOfWeek dayOfWeek){
        return perPlanRepository.getPlanListByDateAndDay(startDate, dayOfWeek);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerPlan> getPlanListByDate(LocalDate startDate){
        return perPlanRepository.getPlanListByDate(startDate);
    }


    @Override
    @Transactional(readOnly = false)
    public void planDelete(PerSubmit perSubmit){
        LocalDate startDate =  LocalDate.of(2000,1,1);
        PerPlan perPlan = perPlanRepository.getPlanUnique(startDate, perSubmit.getSubmitDate().getDayOfWeek(), perSubmit.getDersSira(), perSubmit.getDers());
        if (perPlan!=null){
            delete(perPlan.getId());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public PerPlan getPlanUnique(DayOfWeek dayNo, Integer dersSira, DefItem ders){
        LocalDate startDate = LocalDate.of(2000, 1, 1);
        return perPlanRepository.getPlanUnique(startDate, dayNo, dersSira, ders);
    }

    @Override
    @Transactional(readOnly = false)
    public PerPlan planSaveOrUpdate(PerSubmit perSubmit){
        LocalDate startDate =  LocalDate.of(2000,1,1);
        PerPlan perPlan = perPlanRepository.getPlanUnique(startDate, perSubmit.getSubmitDate().getDayOfWeek(), perSubmit.getDersSira(), perSubmit.getDers());
        if (perPlan!=null){
            perPlan.setDers(perSubmit.getDers());
            perPlan.setDersGrup(perSubmit.getDersGrup());
            perPlan.setDersAdet(perSubmit.getDersAdet());
        } else {
            perPlan = new PerPlan();
            perPlan.setStartDate(startDate);
            perPlan.setPerson(perSubmit.getPerson());
            perPlan.setDayNo(perSubmit.getSubmitDate().getDayOfWeek());
            perPlan.setDersSira(perSubmit.getDersSira());
            perPlan.setDersAdet(perSubmit.getDersAdet());
            perPlan.setDersGrup(perSubmit.getDersGrup());
            perPlan.setDers(perSubmit.getDers());
        }
        PerPlan result = perPlanRepository.save(perPlan);
        return perPlan;
    }

}
