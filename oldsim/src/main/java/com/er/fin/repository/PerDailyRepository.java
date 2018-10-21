package com.er.fin.repository;

import com.er.fin.domain.PerCompany;
import com.er.fin.domain.PerDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the PerDaily entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerDailyRepository extends JpaRepository<PerDaily, Long> {

    List<PerDaily> findAllByOkulOrderByDersSira(PerCompany okul);

}
