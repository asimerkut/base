package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerValue;
import com.er.base.service.PerPersonService;
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

import java.util.*;

/**
 * REST controller for managing PerPerson.
 */
@RestController
@RequestMapping("/api")
public class PerPersonResource {

    private final Logger log = LoggerFactory.getLogger(PerPersonResource.class);

    private static final String ENTITY_NAME = "perPerson";

    private PerPersonService perPersonService;
    private PerValueService perValueService;

    public PerPersonResource(PerPersonService perPersonService, PerValueService perValueService) {
        this.perPersonService = perPersonService;
        this.perValueService = perValueService;
    }

    /**
     * POST  /per-people : Create a new perPerson.
     *
     * @param perPerson the perPerson to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perPerson, or with status 400 (Bad Request) if the perPerson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/per-people")
    @Timed
    public ResponseEntity<PerPerson> createPerPerson(@Valid @RequestBody PerPerson perPerson) throws URISyntaxException {
        log.debug("REST request to save PerPerson : {}", perPerson);
        if (perPerson.getId() != null) {
            throw new BadRequestAlertException("A new perPerson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerPerson result = perPersonService.save(perPerson);
        return ResponseEntity.created(new URI("/api/per-people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /per-people : Updates an existing perPerson.
     *
     * @param perPerson the perPerson to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perPerson,
     * or with status 400 (Bad Request) if the perPerson is not valid,
     * or with status 500 (Internal Server Error) if the perPerson couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/per-people")
    @Timed
    public ResponseEntity<PerPerson> updatePerPerson(@Valid @RequestBody PerPerson perPerson) throws URISyntaxException {
        log.debug("REST request to update PerPerson : {}", perPerson);
        if (perPerson.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerPerson result = perPersonService.save(perPerson);
        for (PerValue val : perPerson.getValLists()){
            val.setPerson(perPerson);
            if (val.getValItem().getId()==null){
                val.setValItem(null);
            }
            perValueService.save(val);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perPerson.getId().toString()))
            .body(result);
    }

    /**
     * GET  /per-people : get all the perPeople.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of perPeople in body
     */
    @GetMapping("/per-people")
    @Timed
    public List<PerPerson> getAllPerPeople() {
        log.debug("REST request to get all PerPeople");
        return perPersonService.findAll();
    }

    /**
     * GET  /per-people/:id : get the "id" perPerson.
     *
     * @param id the id of the perPerson to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perPerson, or with status 404 (Not Found)
     */
    @GetMapping("/per-people/{id}")
    @Timed
    public ResponseEntity<PerPerson> getPerPerson(@PathVariable Long id) {
        log.debug("REST request to get PerPerson : {}", id);
        Optional<PerPerson> perPerson = perPersonService.findOne(id);
        LinkedHashSet<PerValue> valSet = perValueService.findAllByPerson(perPerson.get());
        perPerson.get().setValLists(valSet);
        return ResponseUtil.wrapOrNotFound(perPerson);
    }

    /**
     * DELETE  /per-people/:id : delete the "id" perPerson.
     *
     * @param id the id of the perPerson to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/per-people/{id}")
    @Timed
    public ResponseEntity<Void> deletePerPerson(@PathVariable Long id) {
        log.debug("REST request to delete PerPerson : {}", id);
        perPersonService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/per-people?query=:query : search for the perPerson corresponding
     * to the query.
     *
     * @param query the query of the perPerson search
     * @return the result of the search
     */
    @GetMapping("/_search/per-people")
    @Timed
    public List<PerPerson> searchPerPeople(@RequestParam String query) {
        log.debug("REST request to search PerPeople for query {}", query);
        return perPersonService.search(query);
    }



}
