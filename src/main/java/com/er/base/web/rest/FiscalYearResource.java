package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.FiscalYear;
import com.er.base.service.FiscalYearService;
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
 * REST controller for managing FiscalYear.
 */
@RestController
@RequestMapping("/api")
public class FiscalYearResource {

    private final Logger log = LoggerFactory.getLogger(FiscalYearResource.class);

    private static final String ENTITY_NAME = "fiscalYear";

    private FiscalYearService fiscalYearService;

    public FiscalYearResource(FiscalYearService fiscalYearService) {
        this.fiscalYearService = fiscalYearService;
    }

    /**
     * POST  /fiscal-years : Create a new fiscalYear.
     *
     * @param fiscalYear the fiscalYear to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fiscalYear, or with status 400 (Bad Request) if the fiscalYear has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiscal-years")
    @Timed
    public ResponseEntity<FiscalYear> createFiscalYear(@Valid @RequestBody FiscalYear fiscalYear) throws URISyntaxException {
        log.debug("REST request to save FiscalYear : {}", fiscalYear);
        if (fiscalYear.getId() != null) {
            throw new BadRequestAlertException("A new fiscalYear cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FiscalYear result = fiscalYearService.save(fiscalYear);
        return ResponseEntity.created(new URI("/api/fiscal-years/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiscal-years : Updates an existing fiscalYear.
     *
     * @param fiscalYear the fiscalYear to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fiscalYear,
     * or with status 400 (Bad Request) if the fiscalYear is not valid,
     * or with status 500 (Internal Server Error) if the fiscalYear couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiscal-years")
    @Timed
    public ResponseEntity<FiscalYear> updateFiscalYear(@Valid @RequestBody FiscalYear fiscalYear) throws URISyntaxException {
        log.debug("REST request to update FiscalYear : {}", fiscalYear);
        if (fiscalYear.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FiscalYear result = fiscalYearService.save(fiscalYear);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fiscalYear.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiscal-years : get all the fiscalYears.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fiscalYears in body
     */
    @GetMapping("/fiscal-years")
    @Timed
    public List<FiscalYear> getAllFiscalYears() {
        log.debug("REST request to get all FiscalYears");
        return fiscalYearService.findAll();
    }

    /**
     * GET  /fiscal-years/:id : get the "id" fiscalYear.
     *
     * @param id the id of the fiscalYear to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fiscalYear, or with status 404 (Not Found)
     */
    @GetMapping("/fiscal-years/{id}")
    @Timed
    public ResponseEntity<FiscalYear> getFiscalYear(@PathVariable Long id) {
        log.debug("REST request to get FiscalYear : {}", id);
        Optional<FiscalYear> fiscalYear = fiscalYearService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fiscalYear);
    }

    /**
     * DELETE  /fiscal-years/:id : delete the "id" fiscalYear.
     *
     * @param id the id of the fiscalYear to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiscal-years/{id}")
    @Timed
    public ResponseEntity<Void> deleteFiscalYear(@PathVariable Long id) {
        log.debug("REST request to delete FiscalYear : {}", id);
        fiscalYearService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fiscal-years?query=:query : search for the fiscalYear corresponding
     * to the query.
     *
     * @param query the query of the fiscalYear search
     * @return the result of the search
     */
    @GetMapping("/_search/fiscal-years")
    @Timed
    public List<FiscalYear> searchFiscalYears(@RequestParam String query) {
        log.debug("REST request to search FiscalYears for query {}", query);
        return fiscalYearService.search(query);
    }

}
