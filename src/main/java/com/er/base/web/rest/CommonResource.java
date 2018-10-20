package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.DefItem;
import com.er.base.domain.enumeration.*;
import com.er.base.service.DefItemService;
import com.er.fin.domain.EnmBase;
import com.er.fin.domain.IEnum;
import com.er.fin.domain.JsonUtil;
import com.er.fin.dto.DefTreeDataDTO;
import com.er.fin.dto.DefTreeItemDTO;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.*;

/**
 * REST controller for managing DefItem.
 */
@RestController
@RequestMapping("/api")
public class CommonResource {

    private final Logger log = LoggerFactory.getLogger(DefItemResource.class);

    private final DefItemService defItemService;

    public CommonResource(DefItemService defItemService) {
        this.defItemService = defItemService;
    }


    @GetMapping("/common/def-item-by-type")
    @Timed
    public List<DefItem> findAllByTypeId(@RequestParam String query) {
        log.debug("REST request to get all DefItems");
        JsonNode json = JsonUtil.getJsonObject(query);
        String selId = JsonUtil.getValueString(json, "selId");
        EnmType enmType = EnmType.valueOf(selId);
        return defItemService.findAllByTypeId(enmType);
    }

    @GetMapping("/common/def-item-tree")
    @Timed
    public List<DefTreeItemDTO> searchDefItemTree(@RequestParam String query) {
        List<DefTreeItemDTO> root = new ArrayList<>();
        List<DefItem> itemList = defItemService.search(query);
        if (itemList.isEmpty()) {
            return root;
        }
        Map<Long, DefTreeItemDTO> itemMap = new HashMap<Long, DefTreeItemDTO>();
        for (DefItem val : itemList) {
            DefTreeDataDTO data = new DefTreeDataDTO();
            data.setId(val.getId());
            data.setParentId(val.getParent() == null ? null : val.getParent().getId());
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
            if (valDto.getParent() == null) {
                root.add(selNode);
            } else {
                DefTreeItemDTO parNode = itemMap.get(valDto.getParent().getId());
                if (parNode == null) {
                    root.add(selNode);
                }
                if (parNode.getChildren() == null) {
                    parNode.setChildren(new ArrayList<>());
                }
                parNode.getChildren().add(selNode);
            }
        }
        return root;
    }

    @GetMapping("/common/def-enum")
    @Timed
    public List<EnmBase> findAllByType(@RequestParam String query) {
        log.debug("REST request to get all DefItems");
        JsonNode json = JsonUtil.getJsonObject(query);
        String enumId = JsonUtil.getValueString(json, "selId");
        IEnum[] enmList = null;
        switch (enumId) {
            case "EnmType":
                enmList = EnmType.values();
                break;
            case "EnmCins":
                enmList = EnmCins.values();
                break;
            case "EnmDersGrup":
                enmList = EnmDersGrup.values();
                break;
            case "EnmMedeni":
                enmList = EnmMedeni.values();
                break;
            case "EnmParam":
                enmList = EnmParam.values();
                break;
            case "EnmSozlesme":
                enmList = EnmSozlesme.values();
                break;
            case "EnmDay":
                ArrayList<EnmBase> list = new ArrayList<>();
                for (DayOfWeek d : DayOfWeek.values()) {
                    list.add(new EnmBase(d.name(), d.getDisplayName(TextStyle.FULL, new Locale("tr"))));
                }
                enmList = list.toArray(new EnmBase[list.size()]);
                break;
        }
        ArrayList<EnmBase> valueList = new ArrayList<>();
        for (IEnum e : enmList) {
            valueList.add(EnmBase.getDefEnum(e));
        }
        return valueList;
    }

}
