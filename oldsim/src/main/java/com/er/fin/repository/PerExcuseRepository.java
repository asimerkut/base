package com.er.fin.repository;

import com.er.fin.domain.PerExcuse;
import com.er.fin.domain.PerSubmit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the PerExcuse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerExcuseRepository extends JpaRepository<PerExcuse, Long> {

    @Query("select d from PerExcuse d where d.person.user.login = ?#{principal.username} order by d.startDate, d.startDersNo")
    List<PerExcuse> getPersonExcuse();

}
