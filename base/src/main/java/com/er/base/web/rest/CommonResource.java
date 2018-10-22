package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.DefItem;
import com.er.base.domain.PerDaily;
import com.er.base.domain.PerExcuse;
import com.er.base.domain.PerPerson;
import com.er.base.domain.enumeration.*;
import com.er.base.service.*;
import com.er.base.service.custom.ScheduleUtilService;
import com.er.fin.domain.*;
import com.er.fin.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;
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
    private final PerSubmitService perSubmitService;
    private final PerDailyService perDailyService;
    private final PerPersonService perPersonService;
    private final PerPlanService perPlanService;
    private final PerExcuseService perExcuseService;

    private final ScheduleUtilService scheduleUtilService;

    public CommonResource(DefItemService defItemService,
                          PerSubmitService perSubmitService,
                          PerDailyService perDailyService,
                          PerPersonService perPersonService,
                          PerPlanService perPlanService,
                          PerExcuseService perExcuseService,
                          ScheduleUtilService scheduleUtilService
                          ) {
        this.defItemService = defItemService;
        this.perSubmitService = perSubmitService;
        this.perDailyService = perDailyService;
        this.perPersonService = perPersonService;
        this.perPlanService = perPlanService;
        this.perExcuseService = perExcuseService;

        this.scheduleUtilService = scheduleUtilService;
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
        List<DefItem> itemList = defItemService.searchJson(query);
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

    @GetMapping("/common/per-submits-schedule")
    @Timed
    public ScheduleDataDTO findSubmitSchedule(@RequestParam String query) {
        JsonNode json = JsonUtil.getJsonObject(query);
        LocalDate viewStart = JsonUtil.getValueLocalDate(json,"viewStart");
        LocalDate viewEnd = JsonUtil.getValueLocalDate(json,"viewEnd");
        PerPerson person = perPersonService.getLoginPerson();
        Map<Integer, PerDaily> okulDersSaatMap = perDailyService.findAllByOkul(person.getOkul());               // Okulun Günlük Ders Başlangıç Bitiş Saatleri
        Map<SchKeyDateDTO, PerScheduleDTO> dateDersMap = perSubmitService.getSubmitWiewMap(viewStart, viewEnd); // Schedule Günlerine Göre Girişler

        /*
        if (dateDersMap.size()==0 && viewStart.compareTo(LocalDate.now())<=0){
            submitInitialize(query);
            dateDersMap = perSubmitService.getSubmitWiewMap(viewStart, viewEnd);
        }
        */

        List<PerExcuse> excuseList = perExcuseService.getPersonExcuse();

        List<ScheduleEventDTO> scheduleList = scheduleUtilService.getFullMatrixDate(dateDersMap, okulDersSaatMap, excuseList, viewStart, viewEnd);// Boş Saatlerin Doldurulması
        return new ScheduleDataDTO(scheduleList);
    }

    @GetMapping("/common/per-submits-initialize")
    @Timed
    public ScheduleDataDTO submitInitialize(@RequestParam String query) {
        JsonNode json = JsonUtil.getJsonObject(query);
        LocalDate viewStart = JsonUtil.getValueLocalDate(json,"viewStart");
        LocalDate viewEnd = JsonUtil.getValueLocalDate(json,"viewEnd");
        LocalDate startDate = LocalDate.of(2000,1,1);
        Map<SchKeyWeekDTO, PerScheduleDTO> weekDersMap = perPlanService.getPlanWeekMap(startDate);          // Haftanın Günlerine Göre Haftalık Ders Planı
        if (weekDersMap.size()>0){
            perSubmitService.submitInit(weekDersMap, viewStart, viewEnd);
        }
        return findSubmitSchedule(query);
    }

}
