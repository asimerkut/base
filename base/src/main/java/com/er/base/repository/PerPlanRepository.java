package com.er.base.repository;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the PerPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerPlanRepository extends JpaRepository<PerPlan, Long> {

    //@Query("select d from FinDetailEntity d inner join fetch d.item i where d.bsDocument.id = :documentId")
    //List<FinDetailEntity> findPRDetailList(@Param("documentId")Long documentId);

    //@Modifying
    //@Transactional
    //@Query("update FinDetailEntity t set t.document=null where t.document.id = :finDocId and (resource != 'FIN' and resource != 'ACC')")
    //void updateRefFinInfo(@Param("finDocId") Long id);

    @Query("select distinct d.startDate from PerPlan d where d.person.loginUser.login = ?#{principal.username} order by 1")
    List<LocalDate> getPlanDateList();

    @Query("select d from PerPlan d where d.person.loginUser.login = ?#{principal.username} and d.person = :person")
    List<PerPlan> getPlanListByPerson(@Param("person") PerPerson person);

    @Query("select d from PerPlan d where d.person.loginUser.login = ?#{principal.username} and d.startDate = :startDate and d.dayNo = :dayNo order by d.dersSira, d.id")
    List<PerPlan> getPlanListByDateAndDay(@Param("startDate") LocalDate startDate, @Param("dayNo") DayOfWeek dayNo);

    @Query("select d from PerPlan d where d.person.loginUser.login = ?#{principal.username} and d.startDate = :startDate order by d.dayNo, d.dersSira, d.id")
    List<PerPlan> getPlanListByDate(@Param("startDate") LocalDate startDate);

    @Query("select d from PerPlan d where d.person.loginUser.login = ?#{principal.username} and d.startDate = :startDate and d.dayNo = :dayNo and d.dersSira = :dersSira and d.ders = :ders")
    PerPlan getPlanUnique(@Param("startDate") LocalDate startDate, @Param("dayNo") DayOfWeek dayNo, @Param("dersSira") Integer dersSira, @Param("ders") DefItem ders);

}
