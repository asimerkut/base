package com.er.fin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.fin.domain.DefItem;
import com.er.fin.domain.enumeration.*;
import com.er.fin.service.DefItemService;
import com.er.fin.service.dto.DefTreeDataDTO;
import com.er.fin.service.dto.DefTreeItemDTO;
import com.er.fin.web.rest.errors.BadRequestAlertException;
import com.er.fin.web.rest.util.HeaderUtil;
import com.er.fin.web.rest.util.JsonUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.*;

/**
 * REST controller for managing DefItem.
 */
@RestController
@RequestMapping("/api")
public class DefItemResource {

    private final Logger log = LoggerFactory.getLogger(DefItemResource.class);

    private static final String ENTITY_NAME = "defItem";

    private final DefItemService defItemService;

    public DefItemResource(DefItemService defItemService) {
        this.defItemService = defItemService;
    }

    /**
     * POST  /def-items : Create a new defItem.
     *
     * @param defItem the defItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new defItem, or with status 400 (Bad Request) if the defItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/def-items")
    @Timed
    public ResponseEntity<DefItem> createDefItem(@Valid @RequestBody DefItem defItem) throws URISyntaxException {
        log.debug("REST request to save DefItem : {}", defItem);
        if (defItem.getId() != null) {
            throw new BadRequestAlertException("A new defItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DefItem result = defItemService.save(defItem);
        return ResponseEntity.created(new URI("/api/def-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /def-items : Updates an existing defItem.
     *
     * @param defItem the defItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated defItem,
     * or with status 400 (Bad Request) if the defItem is not valid,
     * or with status 500 (Internal Server Error) if the defItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/def-items")
    @Timed
    public ResponseEntity<DefItem> updateDefItem(@Valid @RequestBody DefItem defItem) throws URISyntaxException {
        log.debug("REST request to update DefItem : {}", defItem);
        if (defItem.getId() == null) {
            return createDefItem(defItem);
        }
        DefItem result = defItemService.save(defItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, defItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /def-items : get all the defItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of defItems in body
     */
    @GetMapping("/def-items")
    @Timed
    public List<DefItem> getAllDefItems() {
        log.debug("REST request to get all DefItems");
        return defItemService.findAll();
        }

    /**
     * GET  /def-items/:id : get the "id" defItem.
     *
     * @param id the id of the defItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the defItem, or with status 404 (Not Found)
     */
    @GetMapping("/def-items/{id}")
    @Timed
    public ResponseEntity<DefItem> getDefItem(@PathVariable Long id) {
        log.debug("REST request to get DefItem : {}", id);
        DefItem defItem = defItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(defItem));
    }

    /**
     * DELETE  /def-items/:id : delete the "id" defItem.
     *
     * @param id the id of the defItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/def-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefItem(@PathVariable Long id) {
        log.debug("REST request to delete DefItem : {}", id);
        defItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/def-items?query=:query : search for the defItem corresponding
     * to the query.
     *
     * @param query the query of the defItem search
     * @return the result of the search
     */
    @GetMapping("/_search/def-items")
    @Timed
    public List<DefItem> searchDefItems(@RequestParam String query) {
        log.debug("REST request to search DefItems for query {}", query);
        return defItemService.search(query);
    }

    @GetMapping("/def-item-by-type")
    @Timed
    public List<DefItem> findAllByTypeId(@RequestParam String query) {
        log.debug("REST request to get all DefItems");
        JSONObject json = JsonUtil.getJsonObject(query);
        String selId = JsonUtil.getValueString(json,"selId");
        EnmType enmType = EnmType.valueOf(selId);
        return defItemService.findAllByTypeId(enmType);
    }

    @GetMapping("/_search/def-item-tree")
    @Timed
    public List<DefTreeItemDTO> searchDefItemTree(@RequestParam String query) {
        List<DefTreeItemDTO> root = new ArrayList<>();
        List<DefItem> itemList = defItemService.search(query);
        if(itemList.isEmpty()){
            return root;
        }
        Map<Long, DefTreeItemDTO> itemMap = new HashMap<Long, DefTreeItemDTO>();
        for (DefItem val : itemList) {
            DefTreeDataDTO data = new DefTreeDataDTO();
            data.setId(val.getId());
            data.setParentId(val.getParent()==null?null:val.getParent().getId());
            data.setCode(val.getCode());
            data.setName(val.getName());
            data.setTypeId(val.getType().getId());
            data.setTypeCode(val.getType().getCode().name());
            DefTreeItemDTO item = new DefTreeItemDTO();
            item.setData(data);
            itemMap.put(val.getId(), item);
        }
        for (DefItem valDto : itemList) {
            DefTreeItemDTO selNode = itemMap.get(valDto.getId());
            if (valDto.getParent()==null) {
                root.add(selNode);
            } else {
                DefTreeItemDTO parNode = itemMap.get(valDto.getParent().getId());
                if (parNode==null){
                    root.add(selNode);
                }
                if (parNode.getChildren()==null){
                    parNode.setChildren(new ArrayList<>());
                }
                parNode.getChildren().add(selNode);
            }
        }
        return root;
    }

    @GetMapping("/def-enum")
    @Timed
    public List<EnmBase> findAllByType(@RequestParam String query) {
        log.debug("REST request to get all DefItems");
        JSONObject json = JsonUtil.getJsonObject(query);
        String enumId = JsonUtil.getValueString(json,"selId");
        IEnum[] enmList = null;
        switch (enumId){
            case "EnmType":
                enmList = EnmType.values();
                break;
            case "EnmCins":
                enmList = EnmCins.values();
                break;
            case "EnmDersGrup":
                enmList =  EnmDersGrup.values();
                break;
            case "EnmMedeni":
                enmList =  EnmMedeni.values();
                break;
            case "EnmParam":
                enmList = EnmParam.values();
                break;
            case "EnmSozlesme":
                enmList = EnmSozlesme.values();
                break;
            case "EnmDay":
                ArrayList<EnmBase> list = new ArrayList<>();
                for (DayOfWeek d : DayOfWeek.values()){
                    list.add(new EnmBase(d.name(), d.getDisplayName(TextStyle.FULL, new Locale("tr"))));
                }
                enmList = list.toArray(new EnmBase[list.size()]);
                break;
        }
        ArrayList<EnmBase> valueList = new ArrayList<>();
        for (IEnum e : enmList){
            valueList.add(EnmBase.getDefEnum(e));
        }
        return valueList;
    }

}
