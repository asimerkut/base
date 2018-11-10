package com.er.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.er.base.domain.*;
import com.er.base.domain.enumeration.*;
import com.er.base.service.*;
import com.er.base.service.custom.ScheduleUtilService;
import com.er.base.web.rest.errors.InternalServerErrorException;
import com.er.fin.domain.*;
import com.er.fin.dto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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
    private final PerSchedulerService perSchedulerService;
    private final PerDailyService perDailyService;
    private final PerPersonService perPersonService;
    private final PerPlanService perPlanService;
    private final PerExcuseService perExcuseService;
    private final DefPivotService defPivotService;
    private final ScheduleUtilService scheduleUtilService;
    private final CommonService commonService;

    public CommonResource(DefItemService defItemService,
                          DefPivotService defPivotService,
                          PerSchedulerService perSchedulerService,
                          PerDailyService perDailyService,
                          PerPersonService perPersonService,
                          PerPlanService perPlanService,
                          PerExcuseService perExcuseService,
                          ScheduleUtilService scheduleUtilService,
                          CommonService commonService
                          ) {
        this.defItemService = defItemService;
        this.defPivotService = defPivotService;
        this.perSchedulerService = perSchedulerService;
        this.perDailyService = perDailyService;
        this.perPersonService = perPersonService;
        this.perPlanService = perPlanService;
        this.perExcuseService = perExcuseService;

        this.scheduleUtilService = scheduleUtilService;
        this.commonService = commonService;
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
            data.setTypeCode(val.getType().getCode());
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
                } else {
                    if (parNode.getChildren() == null) {
                        parNode.setChildren(new ArrayList<>());
                    }
                    parNode.getChildren().add(selNode);
                }
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
        PerPerson person = commonService.getLoginPerson();
        /*
        if (person==null || person.getOkul()==null){
            throw new InternalServerErrorException("Personel/Okul Tanımı Bulunamadı");
        }
        */
        Map<Integer, PerDaily> okulDersSaatMap = commonService.findAllByOkul(person);               // Okulun Günlük Ders Başlangıç Bitiş Saatleri
        Map<SchKeyDateDTO, PerScheduleDTO> dateDersMap = perSchedulerService.getSubmitWiewMap(viewStart, viewEnd); // Schedule Günlerine Göre Girişler

        /*
        if (dateDersMap.size()==0 && viewStart.compareTo(LocalDate.now())<=0){
            submitInitialize(query);
            dateDersMap = perSubmitService.getSubmitWiewMap(viewStart, viewEnd);
        }
        */

        List<PerExcuse> excuseList = commonService.getPersonExcuse();

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
            perSchedulerService.submitInit(weekDersMap, viewStart, viewEnd);
        }
        return findSubmitSchedule(query);
    }

    @GetMapping("/common/def-pivot-data/{id}")
    @Timed
    public String getPivotData(@PathVariable Long id) {
        System.out.println("Pivot Id   = "+id);
        DefPivot defPivotDTO = defPivotService.findOne(id).get();
        PivotDataDTO pivotData = defPivotService.getSqlData(defPivotDTO.getPvtSql());
        String jsonText = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            jsonText = mapper.writeValueAsString(pivotData);
            System.out.println("Pivot JSON = " + jsonText);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonText;
    }

}
