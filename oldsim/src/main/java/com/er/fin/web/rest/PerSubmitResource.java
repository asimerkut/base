package com.er.fin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.fin.domain.*;
import com.er.fin.domain.enumeration.EnmDersGrup;
import com.er.fin.service.*;
import com.er.fin.service.dto.*;
import com.er.fin.web.rest.errors.BadRequestAlertException;
import com.er.fin.web.rest.util.HeaderUtil;
import com.er.fin.web.rest.util.JsonUtil;
import com.er.fin.web.rest.util.ScheduleUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.joda.time.DateTime;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing PerSubmit.
 */
@RestController
@RequestMapping("/api")
public class PerSubmitResource {

    private final Logger log = LoggerFactory.getLogger(PerSubmitResource.class);

    private static final String ENTITY_NAME = "perSubmit";

    private final PerSubmitService perSubmitService;
    private final PerDailyService perDailyService;
    private final ScheduleUtil scheduleService;
    private final PerPersonService perPersonService;
    private final PerPlanService perPlanService;
    private final PerExcuseService perExcuseService;


    public PerSubmitResource(PerSubmitService perSubmitService, PerDailyService perDailyService, ScheduleUtil scheduleService, PerPersonService perPersonService, PerPlanService perPlanService, PerExcuseService perExcuseService) {
        this.perSubmitService = perSubmitService;
        this.perDailyService = perDailyService;
        this.scheduleService = scheduleService;
        this.perPersonService = perPersonService;
        this.perPlanService = perPlanService;
        this.perExcuseService = perExcuseService;
    }

    /**
     * POST  /per-submits : Create a new perSubmit.
     *
     * @param perSubmit the perSubmit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perSubmit, or with status 400 (Bad Request) if the perSubmit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-submits")
    @Timed
    public ResponseEntity<PerSubmit> createPerSubmit(@Valid @RequestBody PerSubmit perSubmit) throws URISyntaxException {
        log.debug("REST request to save PerSubmit : {}", perSubmit);
        if (perSubmit.getId() != null) {
            throw new BadRequestAlertException("A new perSubmit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (perSubmit.getDersSira()==0){
            PerSubmit exist = perSubmitService.getSubmitUnique(perSubmit.getSubmitDate(), perSubmit.getDersSira(), perSubmit.getDers());
            if (exist!=null){
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, "0"))
                    .body(perSubmit);
            }
        }
        PerSubmit result = perSubmitService.save(perSubmit);
        perPlanService.planSaveOrUpdate(perSubmit);

        return ResponseEntity.created(new URI("/api/per-submits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-submits : Updates an existing perSubmit.
     *
     * @param perSubmit the perSubmit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perSubmit,
     * or with status 400 (Bad Request) if the perSubmit is not valid,
     * or with status 500 (Internal Server Error) if the perSubmit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-submits")
    @Timed
    public ResponseEntity<PerSubmit> updatePerSubmit(@Valid @RequestBody PerSubmit perSubmit) throws URISyntaxException {
        log.debug("REST request to update PerSubmit : {}", perSubmit);
        if (perSubmit.getId() == null) {
            return createPerSubmit(perSubmit);
        } else if (perSubmit.getId().longValue()<(-20000000)){
            String cellId = perSubmit.getDersSira().toString();
            if (perSubmit.getDersSira().intValue()<0) {  // Normal
                int sira = new Integer(cellId.substring(9,11));
                perSubmit.setDersSira(sira);
                perSubmit.setDersAdet(1);
            } else { // allDay
                perSubmit.setDersSira(0);
                cellId = perSubmit.getId().toString();
            }
            int yyyy = new Integer(cellId.substring(1,5));
            int mm = new Integer(cellId.substring(5,7));
            int dd = new Integer(cellId.substring(7,9));
            LocalDate cellDate = LocalDate.of(yyyy,mm,dd);
            perSubmit.setDayNo(cellDate.getDayOfWeek());
            perSubmit.setSubmitDate(cellDate);
            PerPerson per = perPersonService.getPerson();
            perSubmit.setPerson(per);
            perSubmit.setDersGrup(EnmDersGrup.D_GS);
            perSubmit.setId(null);
            return createPerSubmit(perSubmit);
        }
        if (perSubmit.getId()<0){//Excuse Edit
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perSubmit.getId().toString()))
                .body(perSubmit);
        }
        PerSubmit orj = perSubmitService.findOne(perSubmit.getId());
        if (orj.getDersSira()==0){
            PerSubmit exist = perSubmitService.getSubmitUnique(orj.getSubmitDate(), orj.getDersSira(), perSubmit.getDers());
            exist.setDersAdet(perSubmit.getDersAdet());
            exist = perSubmitService.save(exist);
            perPlanService.planDelete(orj);
            perPlanService.planSaveOrUpdate(exist);
            if (exist!=null){
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orj.getId().toString()))
                    .body(exist);
            }
        }

        perPlanService.planDelete(orj);
        orj.setDers(perSubmit.getDers());
        orj.setDersAdet(1);
        PerSubmit result = perSubmitService.save(orj);
        perPlanService.planSaveOrUpdate(result);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orj.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-submits : get all the perSubmits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perSubmits in body
     */
    @GetMapping("/per-submits")
    @Timed
    public List<PerSubmit> getAllPerSubmits() {
        log.debug("REST request to get all PerSubmits");
        return perSubmitService.findAll();
        }

    /**
     * GET  /per-submits/:id : get the "id" perSubmit.
     *
     * @param id the id of the perSubmit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perSubmit, or with status 404 (Not Found)
     */
    @GetMapping("/per-submits/{id}")
    @Timed
    public ResponseEntity<PerSubmit> getPerSubmit(@PathVariable Long id) {
        log.debug("REST request to get PerSubmit : {}", id);
        PerSubmit perSubmit = perSubmitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(perSubmit));
    }

    /**
     * DELETE  /per-submits/:id : delete the "id" perSubmit.
     *
     * @param id the id of the perSubmit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-submits/{id}")
    @Timed
    public ResponseEntity<Void> deletePerSubmit(@PathVariable Long id) {
        if (id==null || id.longValue()<0){
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, "0")).build();
        }
        PerSubmit perSubmit = perSubmitService.findOne(id);
        log.debug("REST request to delete PerSubmit : {}", id);
        perSubmitService.delete(perSubmit.getId());

        perPlanService.planDelete(perSubmit);

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-submits?query=:query : search for the perSubmit corresponding
     * to the query.
     *
     * @param query the query of the perSubmit search
     * @return the result of the search
     */
    @GetMapping("/_search/per-submits")
    @Timed
    public List<PerSubmit> searchPerSubmits(@RequestParam String query) {
        log.debug("REST request to search PerSubmits for query {}", query);
        return perSubmitService.search(query);
    }

    @GetMapping("/per-submits-schedule")
    @Timed
    public ScheduleDataDTO findSubmitSchedule(@RequestParam String query) {
        JSONObject json = JsonUtil.getJsonObject(query);
        LocalDate viewStart = JsonUtil.getValueLocalDate(json,"viewStart");
        LocalDate viewEnd = JsonUtil.getValueLocalDate(json,"viewEnd");
        PerPerson person = perPersonService.getPerson();
        Map<Integer, PerDaily> okulDersSaatMap = perDailyService.findAllByOkul(person.getOkul());               // Okulun Günlük Ders Başlangıç Bitiş Saatleri
        Map<SchKeyDateDTO, PerScheduleDTO> dateDersMap = perSubmitService.getSubmitWiewMap(viewStart, viewEnd); // Schedule Günlerine Göre Girişler

        /*
        if (dateDersMap.size()==0 && viewStart.compareTo(LocalDate.now())<=0){
            submitInitialize(query);
            dateDersMap = perSubmitService.getSubmitWiewMap(viewStart, viewEnd);
        }
        */

        List<PerExcuse> excuseList = perExcuseService.getPersonExcuse();

        List<ScheduleEventDTO> scheduleList = scheduleService.getFullMatrixDate(dateDersMap, okulDersSaatMap, excuseList, viewStart, viewEnd);// Boş Saatlerin Doldurulması
        return new ScheduleDataDTO(scheduleList);
    }

    @GetMapping("/per-submits-initialize")
    @Timed
    public ScheduleDataDTO submitInitialize(@RequestParam String query) {
        JSONObject json = JsonUtil.getJsonObject(query);
        LocalDate viewStart = JsonUtil.getValueLocalDate(json,"viewStart");
        LocalDate viewEnd = JsonUtil.getValueLocalDate(json,"viewEnd");
        LocalDate startDate = LocalDate.of(2000,1,1);
        Map<SchKeyWeekDTO, PerScheduleDTO> weekDersMap = perPlanService.getPlanWeekMap(startDate);          // Haftanın Günlerine Göre Haftalık Ders Planı
        if (weekDersMap.size()>0){
            perSubmitService.submitInit(weekDersMap, viewStart, viewEnd);
        }
        return findSubmitSchedule(query);
    }


}
