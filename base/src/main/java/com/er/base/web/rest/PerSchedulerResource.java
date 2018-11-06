package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerSubmit;
import com.er.base.domain.enumeration.EnmDersGrup;
import com.er.base.service.*;
import com.er.base.service.custom.ScheduleUtilService;
import com.er.base.web.rest.errors.BadRequestAlertException;
import com.er.base.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PerSubmit.
 */
@RestController
@RequestMapping("/api")
public class PerSchedulerResource {

    private final Logger log = LoggerFactory.getLogger(PerSchedulerResource.class);

    private static final String ENTITY_NAME = "perSubmit";

    private final PerSchedulerService perSchedulerService;
    private final PerDailyService perDailyService;
    private final ScheduleUtilService scheduleService;
    private final PerPersonService perPersonService;
    private final PerPlanService perPlanService;
    private final PerExcuseService perExcuseService;
    private final CommonService commonService;


    public PerSchedulerResource(PerSchedulerService perSchedulerService, PerDailyService perDailyService, ScheduleUtilService scheduleService, PerPersonService perPersonService, PerPlanService perPlanService, PerExcuseService perExcuseService, CommonService commonService) {
        this.perSchedulerService = perSchedulerService;
        this.perDailyService = perDailyService;
        this.scheduleService = scheduleService;
        this.perPersonService = perPersonService;
        this.perPlanService = perPlanService;
        this.perExcuseService = perExcuseService;
        this.commonService = commonService;

    }
    /**
     * POST  /per-scheduler : Create a new perSubmit.
     *
     * @param perSubmit the perSubmit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perSubmit, or with status 400 (Bad Request) if the perSubmit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */


    @PostMapping("/per-scheduler")
    @Timed
    public ResponseEntity<PerSubmit> createPerSubmit(@RequestBody PerSubmit perSubmit) throws URISyntaxException {
        log.debug("REST request to save PerSubmit : {}", perSubmit);
        if (perSubmit.getId() != null) {
            throw new BadRequestAlertException("A new perSubmit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (perSubmit.getDersSira()==0){
            PerSubmit exist = perSchedulerService.getSubmitUnique(perSubmit.getSubmitDate(), perSubmit.getDersSira(), perSubmit.getDers());
            if (exist!=null){
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, "0"))
                    .body(perSubmit);
            }
        }
        PerSubmit result = perSchedulerService.save(perSubmit);
        perPlanService.planSaveOrUpdate(perSubmit);

        return ResponseEntity.created(new URI("/api/per-scheduler/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-scheduler : Updates an existing perSubmit.
     *
     * @param perSubmit the perSubmit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perSubmit,
     * or with status 400 (Bad Request) if the perSubmit is not valid,
     * or with status 500 (Internal Server Error) if the perSubmit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-scheduler")
    @Timed
    public ResponseEntity<PerSubmit> updatePerSubmit(@RequestBody PerSubmit perSubmit) throws URISyntaxException {
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
            PerPerson per = commonService.getLoginPerson();
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
        PerSubmit orj = perSchedulerService.findOne(perSubmit.getId()).get();
        if (orj.getDersSira()==0){
            PerSubmit exist = perSchedulerService.getSubmitUnique(orj.getSubmitDate(), orj.getDersSira(), perSubmit.getDers());
            exist.setDersAdet(perSubmit.getDersAdet());
            exist = perSchedulerService.save(exist);
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
        PerSubmit result = perSchedulerService.save(orj);
        perPlanService.planSaveOrUpdate(result);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orj.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-scheduler : get all the perSubmits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perSubmits in body
     */
    @GetMapping("/per-scheduler")
    @Timed
    public List<PerSubmit> getAllPerSubmits() {
        log.debug("REST request to get all PerSubmits");
        return perSchedulerService.findAll();
    }

    /**
     * GET  /per-scheduler/:id : get the "id" perSubmit.
     *
     * @param id the id of the perSubmit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perSubmit, or with status 404 (Not Found)
     */
    @GetMapping("/per-scheduler/{id}")
    @Timed
    public ResponseEntity<PerSubmit> getPerSubmit(@PathVariable Long id) {
        log.debug("REST request to get PerSubmit : {}", id);
        Optional<PerSubmit> perSubmit = perSchedulerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(perSubmit);
    }

    /**
     * DELETE  /per-scheduler/:id : delete the "id" perSubmit.
     *
     * @param id the id of the perSubmit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-scheduler/{id}")
    @Timed
    public ResponseEntity<Void> deletePerSubmit(@PathVariable Long id) {
        log.debug("REST request to delete PerSubmit : {}", id);
        perSchedulerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-scheduler?query=:query : search for the perSubmit corresponding
     * to the query.
     *
     * @param query the query of the perSubmit search
     * @return the result of the search
     */
    @GetMapping("/_search/per-scheduler")
    @Timed
    public List<PerSubmit> searchPerSubmits(@RequestParam String query) {
        log.debug("REST request to search PerSubmits for query {}", query);
        return perSchedulerService.search(query);
    }

}
