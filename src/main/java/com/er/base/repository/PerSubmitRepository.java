package com.er.base.repository;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerSubmit;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the PerSubmit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerSubmitRepository extends JpaRepository<PerSubmit, Long> {

    @Query("select d from PerSubmit d where d.person.user.login = ?#{principal.username} and d.submitDate = :submitDate order by d.dersSira, d.id")
    List<PerSubmit> getSubmitListByDate(@Param("submitDate") LocalDate submitDate);

    @Modifying
    @Transactional
    @Query("delete from PerSubmit d where d.person = :person and d.submitDate >= :startDate and d.submitDate < :endDate")
    void deleteSubmitPlan(@Param("person") PerPerson person, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("select d from PerSubmit d where d.person.user.login = ?#{principal.username} and d.submitDate = :submitDate and d.dersSira = :dersSira and d.ders = :ders")
    PerSubmit getSubmitUnique(@Param("submitDate") LocalDate submitDate, @Param("dersSira") Integer dersSira, @Param("ders") DefItem ders);

}
