package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.FiscalDayoff;
import com.er.base.service.FiscalDayoffService;
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
 * REST controller for managing FiscalDayoff.
 */
@RestController
@RequestMapping("/api")
public class FiscalDayoffResource {

    private final Logger log = LoggerFactory.getLogger(FiscalDayoffResource.class);

    private static final String ENTITY_NAME = "fiscalDayoff";

    private FiscalDayoffService fiscalDayoffService;

    public FiscalDayoffResource(FiscalDayoffService fiscalDayoffService) {
        this.fiscalDayoffService = fiscalDayoffService;
    }

    /**
     * POST  /fiscal-dayoffs : Create a new fiscalDayoff.
     *
     * @param fiscalDayoff the fiscalDayoff to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fiscalDayoff, or with status 400 (Bad Request) if the fiscalDayoff has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiscal-dayoffs")
    @Timed
    public ResponseEntity<FiscalDayoff> createFiscalDayoff(@Valid @RequestBody FiscalDayoff fiscalDayoff) throws URISyntaxException {
        log.debug("REST request to save FiscalDayoff : {}", fiscalDayoff);
        if (fiscalDayoff.getId() != null) {
            throw new BadRequestAlertException("A new fiscalDayoff cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FiscalDayoff result = fiscalDayoffService.save(fiscalDayoff);
        return ResponseEntity.created(new URI("/api/fiscal-dayoffs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiscal-dayoffs : Updates an existing fiscalDayoff.
     *
     * @param fiscalDayoff the fiscalDayoff to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fiscalDayoff,
     * or with status 400 (Bad Request) if the fiscalDayoff is not valid,
     * or with status 500 (Internal Server Error) if the fiscalDayoff couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiscal-dayoffs")
    @Timed
    public ResponseEntity<FiscalDayoff> updateFiscalDayoff(@Valid @RequestBody FiscalDayoff fiscalDayoff) throws URISyntaxException {
        log.debug("REST request to update FiscalDayoff : {}", fiscalDayoff);
        if (fiscalDayoff.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FiscalDayoff result = fiscalDayoffService.save(fiscalDayoff);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fiscalDayoff.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiscal-dayoffs : get all the fiscalDayoffs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fiscalDayoffs in body
     */
    @GetMapping("/fiscal-dayoffs")
    @Timed
    public List<FiscalDayoff> getAllFiscalDayoffs() {
        log.debug("REST request to get all FiscalDayoffs");
        return fiscalDayoffService.findAll();
    }

    /**
     * GET  /fiscal-dayoffs/:id : get the "id" fiscalDayoff.
     *
     * @param id the id of the fiscalDayoff to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fiscalDayoff, or with status 404 (Not Found)
     */
    @GetMapping("/fiscal-dayoffs/{id}")
    @Timed
    public ResponseEntity<FiscalDayoff> getFiscalDayoff(@PathVariable Long id) {
        log.debug("REST request to get FiscalDayoff : {}", id);
        Optional<FiscalDayoff> fiscalDayoff = fiscalDayoffService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fiscalDayoff);
    }

    /**
     * DELETE  /fiscal-dayoffs/:id : delete the "id" fiscalDayoff.
     *
     * @param id the id of the fiscalDayoff to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiscal-dayoffs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFiscalDayoff(@PathVariable Long id) {
        log.debug("REST request to delete FiscalDayoff : {}", id);
        fiscalDayoffService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fiscal-dayoffs?query=:query : search for the fiscalDayoff corresponding
     * to the query.
     *
     * @param query the query of the fiscalDayoff search
     * @return the result of the search
     */
    @GetMapping("/_search/fiscal-dayoffs")
    @Timed
    public List<FiscalDayoff> searchFiscalDayoffs(@RequestParam String query) {
        log.debug("REST request to search FiscalDayoffs for query {}", query);
        return fiscalDayoffService.search(query);
    }

}
