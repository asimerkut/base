package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.PerPeriodState;
import com.er.base.service.PerPeriodStateService;
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
 * REST controller for managing PerPeriodState.
 */
@RestController
@RequestMapping("/api")
public class PerPeriodStateResource {

    private final Logger log = LoggerFactory.getLogger(PerPeriodStateResource.class);

    private static final String ENTITY_NAME = "perPeriodState";

    private PerPeriodStateService perPeriodStateService;

    public PerPeriodStateResource(PerPeriodStateService perPeriodStateService) {
        this.perPeriodStateService = perPeriodStateService;
    }

    /**
     * POST  /per-period-states : Create a new perPeriodState.
     *
     * @param perPeriodState the perPeriodState to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perPeriodState, or with status 400 (Bad Request) if the perPeriodState has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-period-states")
    @Timed
    public ResponseEntity<PerPeriodState> createPerPeriodState(@Valid @RequestBody PerPeriodState perPeriodState) throws URISyntaxException {
        log.debug("REST request to save PerPeriodState : {}", perPeriodState);
        if (perPeriodState.getId() != null) {
            throw new BadRequestAlertException("A new perPeriodState cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerPeriodState result = perPeriodStateService.save(perPeriodState);
        return ResponseEntity.created(new URI("/api/per-period-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-period-states : Updates an existing perPeriodState.
     *
     * @param perPeriodState the perPeriodState to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perPeriodState,
     * or with status 400 (Bad Request) if the perPeriodState is not valid,
     * or with status 500 (Internal Server Error) if the perPeriodState couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-period-states")
    @Timed
    public ResponseEntity<PerPeriodState> updatePerPeriodState(@Valid @RequestBody PerPeriodState perPeriodState) throws URISyntaxException {
        log.debug("REST request to update PerPeriodState : {}", perPeriodState);
        if (perPeriodState.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerPeriodState result = perPeriodStateService.save(perPeriodState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perPeriodState.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-period-states : get all the perPeriodStates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perPeriodStates in body
     */
    @GetMapping("/per-period-states")
    @Timed
    public List<PerPeriodState> getAllPerPeriodStates() {
        log.debug("REST request to get all PerPeriodStates");
        return perPeriodStateService.findAll();
    }

    /**
     * GET  /per-period-states/:id : get the "id" perPeriodState.
     *
     * @param id the id of the perPeriodState to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perPeriodState, or with status 404 (Not Found)
     */
    @GetMapping("/per-period-states/{id}")
    @Timed
    public ResponseEntity<PerPeriodState> getPerPeriodState(@PathVariable Long id) {
        log.debug("REST request to get PerPeriodState : {}", id);
        Optional<PerPeriodState> perPeriodState = perPeriodStateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(perPeriodState);
    }

    /**
     * DELETE  /per-period-states/:id : delete the "id" perPeriodState.
     *
     * @param id the id of the perPeriodState to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-period-states/{id}")
    @Timed
    public ResponseEntity<Void> deletePerPeriodState(@PathVariable Long id) {
        log.debug("REST request to delete PerPeriodState : {}", id);
        perPeriodStateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-period-states?query=:query : search for the perPeriodState corresponding
     * to the query.
     *
     * @param query the query of the perPeriodState search
     * @return the result of the search
     */
    @GetMapping("/_search/per-period-states")
    @Timed
    public List<PerPeriodState> searchPerPeriodStates(@RequestParam String query) {
        log.debug("REST request to search PerPeriodStates for query {}", query);
        return perPeriodStateService.search(query);
    }

}
