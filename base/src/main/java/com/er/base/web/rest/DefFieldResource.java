package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.DefField;
import com.er.base.service.DefFieldService;
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
 * REST controller for managing DefField.
 */
@RestController
@RequestMapping("/api")
public class DefFieldResource {

    private final Logger log = LoggerFactory.getLogger(DefFieldResource.class);

    private static final String ENTITY_NAME = "defField";

    private DefFieldService defFieldService;

    public DefFieldResource(DefFieldService defFieldService) {
        this.defFieldService = defFieldService;
    }


    /**
     * POST  /def-fields : Create a new defField.
     *
     * @param defField the defField to create
     * @return the ResponseEntity with status 201 (Created) and with body the new defField, or with status 400 (Bad Request) if the defField has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/def-fields")
    @Timed
    public ResponseEntity<DefField> createDefField(@Valid @RequestBody DefField defField) throws URISyntaxException {
        defField.setTabName(DefField.TAB_NAME);
        log.debug("REST request to save DefField : {}", defField);
        if (defField.getId() != null) {
            throw new BadRequestAlertException("A new defField cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DefField result = defFieldService.save(defField);
        return ResponseEntity.created(new URI("/api/def-fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /def-fields : Updates an existing defField.
     *
     * @param defField the defField to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated defField,
     * or with status 400 (Bad Request) if the defField is not valid,
     * or with status 500 (Internal Server Error) if the defField couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/def-fields")
    @Timed
    public ResponseEntity<DefField> updateDefField(@Valid @RequestBody DefField defField) throws URISyntaxException {
        defField.setTabName(DefField.TAB_NAME);
        log.debug("REST request to update DefField : {}", defField);
        if (defField.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DefField result = defFieldService.save(defField);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, defField.getId().toString()))
            .body(result);
    }

    /**
     * GET  /def-fields : get all the defFields.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of defFields in body
     */
    @GetMapping("/def-fields")
    @Timed
    public List<DefField> getAllDefFields() {
        log.debug("REST request to get all DefFields");
        List<DefField> list = defFieldService.findAllByTabName(DefField.TAB_NAME);
        return list;
    }

    /**
     * GET  /def-fields/:id : get the "id" defField.
     *
     * @param id the id of the defField to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the defField, or with status 404 (Not Found)
     */
    @GetMapping("/def-fields/{id}")
    @Timed
    public ResponseEntity<DefField> getDefField(@PathVariable Long id) {
        log.debug("REST request to get DefField : {}", id);
        Optional<DefField> defField = defFieldService.findOne(id);
        return ResponseUtil.wrapOrNotFound(defField);
    }

    /**
     * DELETE  /def-fields/:id : delete the "id" defField.
     *
     * @param id the id of the defField to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/def-fields/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefField(@PathVariable Long id) {
        log.debug("REST request to delete DefField : {}", id);
        defFieldService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/def-fields?query=:query : search for the defField corresponding
     * to the query.
     *
     * @param query the query of the defField search
     * @return the result of the search
     */
    @GetMapping("/_search/def-fields")
    @Timed
    public List<DefField> searchDefFields(@RequestParam String query) {
        log.debug("REST request to search DefFields for query {}", query);
        return defFieldService.search(query);
    }

}
