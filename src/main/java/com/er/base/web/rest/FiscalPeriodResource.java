package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.FiscalPeriod;
import com.er.base.service.FiscalPeriodService;
import com.er.base.web.rest.errors.BadRequestAlertException;
import com.er.base.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FiscalPeriod.
 */
@RestController
@RequestMapping("/api")
public class FiscalPeriodResource {

    private final Logger log = LoggerFactory.getLogger(FiscalPeriodResource.class);

    private static final String ENTITY_NAME = "fiscalPeriod";

    private FiscalPeriodService fiscalPeriodService;

    public FiscalPeriodResource(FiscalPeriodService fiscalPeriodService) {
        this.fiscalPeriodService = fiscalPeriodService;
    }

    /**
     * POST  /fiscal-periods : Create a new fiscalPeriod.
     *
     * @param fiscalPeriod the fiscalPeriod to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fiscalPeriod, or with status 400 (Bad Request) if the fiscalPeriod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiscal-periods")
    @Timed
    public ResponseEntity<FiscalPeriod> createFiscalPeriod(@Valid @RequestBody FiscalPeriod fiscalPeriod) throws URISyntaxException {
        log.debug("REST request to save FiscalPeriod : {}", fiscalPeriod);
        if (fiscalPeriod.getId() != null) {
            throw new BadRequestAlertException("A new fiscalPeriod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FiscalPeriod result = fiscalPeriodService.save(fiscalPeriod);
        return ResponseEntity.created(new URI("/api/fiscal-periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiscal-periods : Updates an existing fiscalPeriod.
     *
     * @param fiscalPeriod the fiscalPeriod to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fiscalPeriod,
     * or with status 400 (Bad Request) if the fiscalPeriod is not valid,
     * or with status 500 (Internal Server Error) if the fiscalPeriod couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiscal-periods")
    @Timed
    public ResponseEntity<FiscalPeriod> updateFiscalPeriod(@Valid @RequestBody FiscalPeriod fiscalPeriod) throws URISyntaxException {
        log.debug("REST request to update FiscalPeriod : {}", fiscalPeriod);
        if (fiscalPeriod.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FiscalPeriod result = fiscalPeriodService.save(fiscalPeriod);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fiscalPeriod.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiscal-periods : get all the fiscalPeriods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fiscalPeriods in body
     */
    @GetMapping("/fiscal-periods")
    @Timed
    public List<FiscalPeriod> getAllFiscalPeriods() {
        log.debug("REST request to get all FiscalPeriods");
        return fiscalPeriodService.findAll();
    }

    /**
     * GET  /fiscal-periods/:id : get the "id" fiscalPeriod.
     *
     * @param id the id of the fiscalPeriod to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fiscalPeriod, or with status 404 (Not Found)
     */
    @GetMapping("/fiscal-periods/{id}")
    @Timed
    public ResponseEntity<FiscalPeriod> getFiscalPeriod(@PathVariable Long id) {
        log.debug("REST request to get FiscalPeriod : {}", id);
        Optional<FiscalPeriod> fiscalPeriod = fiscalPeriodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fiscalPeriod);
    }

    /**
     * DELETE  /fiscal-periods/:id : delete the "id" fiscalPeriod.
     *
     * @param id the id of the fiscalPeriod to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiscal-periods/{id}")
    @Timed
    public ResponseEntity<Void> deleteFiscalPeriod(@PathVariable Long id) {
        log.debug("REST request to delete FiscalPeriod : {}", id);
        fiscalPeriodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fiscal-periods?query=:query : search for the fiscalPeriod corresponding
     * to the query.
     *
     * @param query the query of the fiscalPeriod search
     * @return the result of the search
     */
    @GetMapping("/_search/fiscal-periods")
    @Timed
    public List<FiscalPeriod> searchFiscalPeriods(@RequestParam String query) {
        log.debug("REST request to search FiscalPeriods for query {}", query);
        return fiscalPeriodService.search(query);
    }

}
