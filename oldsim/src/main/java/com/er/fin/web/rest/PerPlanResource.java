package com.er.fin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.fin.domain.PerDaily;
import com.er.fin.domain.PerPerson;
import com.er.fin.domain.PerPlan;
import com.er.fin.domain.enumeration.EnmDersGrup;
import com.er.fin.service.PerDailyService;
import com.er.fin.service.PerPersonService;
import com.er.fin.service.PerPlanService;
import com.er.fin.service.dto.PerScheduleDTO;
import com.er.fin.service.dto.SchKeyWeekDTO;
import com.er.fin.service.dto.ScheduleDataDTO;
import com.er.fin.web.rest.errors.BadRequestAlertException;
import com.er.fin.web.rest.util.HeaderUtil;
import com.er.fin.web.rest.util.JsonUtil;
import com.er.fin.web.rest.util.ScheduleUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * REST controller for managing PerPlan.
 */
@RestController
@RequestMapping("/api")
public class PerPlanResource {

    private final Logger log = LoggerFactory.getLogger(PerPlanResource.class);

    private static final String ENTITY_NAME = "perPlan";

    private final PerDailyService perDailyService;
    private final PerPlanService perPlanService;
    private final PerPersonService perPersonService;
    private final ScheduleUtil scheduleService;


    public PerPlanResource(PerPlanService perPlanService, PerDailyService perDailyService, PerPersonService perPersonService, ScheduleUtil scheduleService) {
        this.perPlanService = perPlanService;
        this.perDailyService = perDailyService;
        this.perPersonService = perPersonService;
        this.scheduleService = scheduleService;
    }

    /**
     * POST  /per-plans : Create a new perPlan.
     *
     * @param perPlan the perPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perPlan, or with status 400 (Bad Request) if the perPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-plans")
    @Timed
    public ResponseEntity<PerPlan> createPerPlan(@Valid @RequestBody PerPlan perPlan) throws URISyntaxException {
        log.debug("REST request to save PerPlan : {}", perPlan);
        if (perPlan.getId() != null) {
            throw new BadRequestAlertException("A new perPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (perPlan.getDersSira()==0){
            PerPlan exists = perPlanService.getPlanUnique(perPlan.getDayNo(), perPlan.getDersSira(), perPlan.getDers());
            if (exists!=null){
                return ResponseEntity.created(new URI("/api/per-plans/" + exists.getId()))
                    .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, exists.getId().toString()))
                    .body(exists);
            }
        }
        PerPlan result = perPlanService.save(perPlan);
        return ResponseEntity.created(new URI("/api/per-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-plans : Updates an existing perPlan.
     *
     * @param perPlan the perPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perPlan,
     * or with status 400 (Bad Request) if the perPlan is not valid,
     * or with status 500 (Internal Server Error) if the perPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-plans")
    @Timed
    public ResponseEntity<PerPlan> updatePerPlan(@Valid @RequestBody PerPlan perPlan) throws URISyntaxException {
        log.debug("REST request to update PerPlan : {}", perPlan);
        if (perPlan.getId() == null) {
            return createPerPlan(perPlan);
        } else if (perPlan.getId().longValue()<0){
            String cellId = perPlan.getDersSira().toString();
            if (perPlan.getDersSira().intValue()<0) {  // Normal
                int sira = new Integer(cellId.substring(9,11));
                perPlan.setDersSira(sira);
            } else { // allDay
                perPlan.setDersSira(0);
                cellId = perPlan.getId().toString();
            }
            int yyyy = new Integer(cellId.substring(1,5));
            int mm = new Integer(cellId.substring(5,7));
            int dd = new Integer(cellId.substring(7,9));
            LocalDate cellDate = LocalDate.of(yyyy,mm,dd);
            perPlan.setDayNo(cellDate.getDayOfWeek());
            perPlan.setStartDate(LocalDate.of(2000,1,1));
            PerPerson per = perPersonService.getPerson();
            perPlan.setPerson(per);
            perPlan.setDersGrup(EnmDersGrup.D_GS);
            perPlan.setId(null);
            return createPerPlan(perPlan);
        }
        PerPlan orj = perPlanService.findOne(perPlan.getId());
        if (orj.getDersSira()==0){
            PerPlan exists = perPlanService.getPlanUnique(orj.getDayNo(), orj.getDersSira(), perPlan.getDers());
            if (exists!=null){
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exists.getId().toString()))
                    .body(exists);
            }
        }
        orj.setDers(perPlan.getDers());
        PerPlan result = perPlanService.save(orj);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orj.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-plans : get all the perPlans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perPlans in body
     */
    @GetMapping("/per-plans")
    @Timed
    public List<PerPlan> getAllPerPlans() {
        log.debug("REST request to get all PerPlans");
        return perPlanService.findAll();
        }

    /**
     * GET  /per-plans/:id : get the "id" perPlan.
     *
     * @param id the id of the perPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perPlan, or with status 404 (Not Found)
     */
    @GetMapping("/per-plans/{id}")
    @Timed
    public ResponseEntity<PerPlan> getPerPlan(@PathVariable Long id) {
        log.debug("REST request to get PerPlan : {}", id);
        PerPlan perPlan = perPlanService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(perPlan));
    }

    /**
     * DELETE  /per-plans/:id : delete the "id" perPlan.
     *
     * @param id the id of the perPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-plans/{id}")
    @Timed
    public ResponseEntity<Void> deletePerPlan(@PathVariable Long id) {
        if (id==null || id.longValue()<0){
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, "0")).build();
        }
        log.debug("REST request to delete PerPlan : {}", id);
        perPlanService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-plans?query=:query : search for the perPlan corresponding
     * to the query.
     *
     * @param query the query of the perPlan search
     * @return the result of the search
     */
    @GetMapping("/_search/per-plans")
    @Timed
    public List<PerPlan> searchPerPlans(@RequestParam String query) {
        JSONObject q1 = JsonUtil.getJsonObject(query);
        JSONObject q2 = JsonUtil.getValueJSON(q1, "query");
        LocalDate selId = JsonUtil.getValueLocalDate(q2,"selId");
        List<PerPlan> list =  perPlanService.getPlanListByDate(selId);
        return list;
    }

    @GetMapping("/per-plans-schedule")
    @Timed
    public ScheduleDataDTO findPlanSchedule(@RequestParam String query) {
        JSONObject json = JsonUtil.getJsonObject(query);

        LocalDate startDate = JsonUtil.getValueLocalDate(json,"startDate");
        LocalDate viewStart = JsonUtil.getValueLocalDate(json,"viewStart");
        LocalDate viewEnd = JsonUtil.getValueLocalDate(json,"viewEnd");

        PerPerson person = perPersonService.getPerson();
        Map<Integer, PerDaily> okulDersSaatMap = perDailyService.findAllByOkul(person.getOkul());                          // Okulun Günlük Ders Başlangıç Bitiş Saatleri
        Map<SchKeyWeekDTO, PerScheduleDTO> weekDersMap = perPlanService.getPlanWeekMap(startDate);          // Haftanın Günlerine Göre Haftalık Ders Planı
        List scheduleList = scheduleService.getFullMatrixWeek(weekDersMap, okulDersSaatMap, viewStart, viewEnd);// Boş Saatlerin Doldurulması

        return new ScheduleDataDTO(scheduleList);
    }


    @GetMapping("/per-plan-date")
    @Timed
    public List<Map<String,Object>> getPlanDateList(@RequestParam String query)  throws Exception{
        List<Map<String,Object>> dto = new ArrayList<>();
        List<LocalDate> listDate = perPlanService.getPlanDateList();
        for(LocalDate d :listDate){
            Map<String,Object> map = new HashMap<>();
            map.put("startDate",d.format(DateTimeFormatter.ISO_LOCAL_DATE));
            dto.add(map);
        }
        return dto;
    }


}
