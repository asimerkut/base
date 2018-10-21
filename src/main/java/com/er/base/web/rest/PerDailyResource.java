package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.PerDaily;
import com.er.base.service.PerDailyService;
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
 * REST controller for managing PerDaily.
 */
@RestController
@RequestMapping("/api")
public class PerDailyResource {

    private final Logger log = LoggerFactory.getLogger(PerDailyResource.class);

    private static final String ENTITY_NAME = "perDaily";

    private PerDailyService perDailyService;

    public PerDailyResource(PerDailyService perDailyService) {
        this.perDailyService = perDailyService;
    }

    /**
     * POST  /per-dailies : Create a new perDaily.
     *
     * @param perDaily the perDaily to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perDaily, or with status 400 (Bad Request) if the perDaily has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-dailies")
    @Timed
    public ResponseEntity<PerDaily> createPerDaily(@Valid @RequestBody PerDaily perDaily) throws URISyntaxException {
        log.debug("REST request to save PerDaily : {}", perDaily);
        if (perDaily.getId() != null) {
            throw new BadRequestAlertException("A new perDaily cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerDaily result = perDailyService.save(perDaily);
        return ResponseEntity.created(new URI("/api/per-dailies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-dailies : Updates an existing perDaily.
     *
     * @param perDaily the perDaily to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perDaily,
     * or with status 400 (Bad Request) if the perDaily is not valid,
     * or with status 500 (Internal Server Error) if the perDaily couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-dailies")
    @Timed
    public ResponseEntity<PerDaily> updatePerDaily(@Valid @RequestBody PerDaily perDaily) throws URISyntaxException {
        log.debug("REST request to update PerDaily : {}", perDaily);
        if (perDaily.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerDaily result = perDailyService.save(perDaily);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perDaily.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-dailies : get all the perDailies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perDailies in body
     */
    @GetMapping("/per-dailies")
    @Timed
    public List<PerDaily> getAllPerDailies() {
        log.debug("REST request to get all PerDailies");
        return perDailyService.findAll();
    }

    /**
     * GET  /per-dailies/:id : get the "id" perDaily.
     *
     * @param id the id of the perDaily to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perDaily, or with status 404 (Not Found)
     */
    @GetMapping("/per-dailies/{id}")
    @Timed
    public ResponseEntity<PerDaily> getPerDaily(@PathVariable Long id) {
        log.debug("REST request to get PerDaily : {}", id);
        Optional<PerDaily> perDaily = perDailyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(perDaily);
    }

    /**
     * DELETE  /per-dailies/:id : delete the "id" perDaily.
     *
     * @param id the id of the perDaily to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-dailies/{id}")
    @Timed
    public ResponseEntity<Void> deletePerDaily(@PathVariable Long id) {
        log.debug("REST request to delete PerDaily : {}", id);
        perDailyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-dailies?query=:query : search for the perDaily corresponding
     * to the query.
     *
     * @param query the query of the perDaily search
     * @return the result of the search
     */
    @GetMapping("/_search/per-dailies")
    @Timed
    public List<PerDaily> searchPerDailies(@RequestParam String query) {
        log.debug("REST request to search PerDailies for query {}", query);
        return perDailyService.search(query);
    }

}
