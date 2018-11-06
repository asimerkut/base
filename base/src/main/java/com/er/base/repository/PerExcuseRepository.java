package com.er.base.repository;

import com.er.base.domain.PerExcuse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the PerExcuse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerExcuseRepository extends JpaRepository<PerExcuse, Long> {

    @Query("select d from PerExcuse d where d.person.loginUser.login = ?#{principal.username} order by d.startDate, d.startDersNo")
    List<PerExcuse> getPersonExcuse();

}
