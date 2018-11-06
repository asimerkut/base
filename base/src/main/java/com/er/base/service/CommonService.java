package com.er.base.service;

import com.er.base.domain.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service Interface for managing PerPerson.
 */
public interface CommonService {

    PerPerson getLoginPerson();

    PerPerson registerPerson(User user);

    List<PerExcuse> getPersonExcuse();

    Map<Integer, PerDaily> findAllByOkul(PerPerson person);

    List<PerDaily> findAllByOkulList(PerPerson person);

}
