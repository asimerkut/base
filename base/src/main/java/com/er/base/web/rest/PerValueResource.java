package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.PerValue;
import com.er.base.service.PerValueService;
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
 * REST controller for managing PerValue.
 */
@RestController
@RequestMapping("/api")
public class PerValueResource {

    private final Logger log = LoggerFactory.getLogger(PerValueResource.class);

    private static final String ENTITY_NAME = "perValue";

    private PerValueService perValueService;

    public PerValueResource(PerValueService perValueService) {
        this.perValueService = perValueService;
    }

    /**
     * POST  /per-values : Create a new perValue.
     *
     * @param perValue the perValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perValue, or with status 400 (Bad Request) if the perValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-values")
    @Timed
    public ResponseEntity<PerValue> createPerValue(@Valid @RequestBody PerValue perValue) throws URISyntaxException {
        log.debug("REST request to save PerValue : {}", perValue);
        if (perValue.getId() != null) {
            throw new BadRequestAlertException("A new perValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerValue result = perValueService.save(perValue);
        return ResponseEntity.created(new URI("/api/per-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-values : Updates an existing perValue.
     *
     * @param perValue the perValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perValue,
     * or with status 400 (Bad Request) if the perValue is not valid,
     * or with status 500 (Internal Server Error) if the perValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-values")
    @Timed
    public ResponseEntity<PerValue> updatePerValue(@Valid @RequestBody PerValue perValue) throws URISyntaxException {
        log.debug("REST request to update PerValue : {}", perValue);
        if (perValue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerValue result = perValueService.save(perValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-values : get all the perValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perValues in body
     */
    @GetMapping("/per-values")
    @Timed
    public List<PerValue> getAllPerValues() {
        log.debug("REST request to get all PerValues");
        return perValueService.findAll();
    }

    /**
     * GET  /per-values/:id : get the "id" perValue.
     *
     * @param id the id of the perValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perValue, or with status 404 (Not Found)
     */
    @GetMapping("/per-values/{id}")
    @Timed
    public ResponseEntity<PerValue> getPerValue(@PathVariable Long id) {
        log.debug("REST request to get PerValue : {}", id);
        Optional<PerValue> perValue = perValueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(perValue);
    }

    /**
     * DELETE  /per-values/:id : delete the "id" perValue.
     *
     * @param id the id of the perValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-values/{id}")
    @Timed
    public ResponseEntity<Void> deletePerValue(@PathVariable Long id) {
        log.debug("REST request to delete PerValue : {}", id);
        perValueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-values?query=:query : search for the perValue corresponding
     * to the query.
     *
     * @param query the query of the perValue search
     * @return the result of the search
     */
    @GetMapping("/_search/per-values")
    @Timed
    public List<PerValue> searchPerValues(@RequestParam String query) {
        log.debug("REST request to search PerValues for query {}", query);
        return perValueService.search(query);
    }

}
