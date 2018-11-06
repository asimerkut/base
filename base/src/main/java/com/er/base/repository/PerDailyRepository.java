package com.er.base.repository;

import com.er.base.domain.PerDaily;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerDaily entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerDailyRepository extends JpaRepository<PerDaily, Long> {

}
