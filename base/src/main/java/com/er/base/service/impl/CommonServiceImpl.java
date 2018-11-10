package com.er.base.service.impl;

import com.er.base.domain.*;
import com.er.base.repository.PerExcuseRepository;
import com.er.base.repository.PerPersonRepository;
import com.er.base.service.CommonService;
import com.er.base.service.DefTypeService;
import com.er.base.service.PerValueService;
import com.er.fin.domain.FinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service Implementation for managing PerPerson.
 */
@Service
@Transactional
public class CommonServiceImpl implements CommonService {

    private final Logger log = LoggerFactory.getLogger(CommonServiceImpl.class);

    private PerPersonRepository perPersonRepository;

    private PerExcuseRepository perExcuseRepository;

    private DefTypeService defTypeService;

    private PerValueService perValueService;

    public CommonServiceImpl(PerPersonRepository perPersonRepository, PerExcuseRepository perExcuseRepository, DefTypeService defTypeService, PerValueService perValueService) {
        this.perPersonRepository = perPersonRepository;
        this.perExcuseRepository = perExcuseRepository;
        this.defTypeService = defTypeService;
        this.perValueService = perValueService;
    }


    @Override
    @Transactional(readOnly = true)
    public PerPerson getLoginPerson(){
        List<PerPerson> perList = perPersonRepository.getLoginPerson();
        return perList.get(0);
    }

    @Override
    @Transactional(readOnly = false)
    public PerPerson registerPerson(User user){
        PerPerson per = new PerPerson();
        per.setLoginUser(user);
        per.setName(user.getLogin());
        per.setEmail(user.getEmail());
        per.setShift1(4);
        per.setShift2(4);
        per.setShift3(4);
        per = perPersonRepository.save(per);
        return per;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerExcuse> getPersonExcuse(){
        return perExcuseRepository.getPersonExcuse();
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Integer, PerDaily> findAllByOkul(PerPerson person){
        Map<Integer, PerDaily> map = new HashMap<>();
        //List<PerDaily> list = perDailyRepository.findAllByOkulOrderByDersSira(okul);
        //for (PerDaily d : list){
        //    map.put(d.getDersSira(), d);
        //}
        int oo = person.getShift1();
        int os = oo+person.getShift2();
        int gc = os+person.getShift3();
        for (int i=1;i<=oo;i++){
            map.put(i, getDaily(i, person));
        }
        for (int i=oo+1;i<=os;i++){
            map.put(i, getDaily(i, person));
        }
        for (int i=os+1;i<=gc;i++){
            map.put(i, getDaily(i, person));
        }
        return map;
    }

    private PerDaily getDaily(int i, PerPerson person){
        PerDaily d = new PerDaily();
        d.setId(new Long(i));
        d.dersSira(i);
        d.setPerson(person);
        d.setHourStart(FinUtil.LPad(new Long(i).toString(),2,'0')+":01");
        d.setHourFinish(FinUtil.LPad(new Long ((i)).toString(),2,'0')+":59");
        return d;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PerDaily> findAllByOkulList(PerPerson person){
        //PerCompany okul = perCompanyRepository.findById(okulId).get();
        //List<PerDaily> list =  Arrays.asList(person.getDailyLists().toArray()); //perDailyRepository.findAllByOkulOrderByDersSira(okul);
        return null;
    }

}
