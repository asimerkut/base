package com.er.base.repository;

import com.er.base.domain.PerExcuse;
import com.er.base.domain.PerPeriodState;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the PerPeriodState entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerPeriodStateRepository extends JpaRepository<PerPeriodState, Long> {

    @Query("select d from PerPeriodState d where d.person.user.login = ?#{principal.username} order by d.fiscalPeriod.id")
    List<PerPeriodState> getPersonPeriodState();

}
