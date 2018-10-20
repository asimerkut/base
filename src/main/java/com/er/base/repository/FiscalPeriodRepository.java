package com.er.base.repository;

import com.er.base.domain.FiscalPeriod;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FiscalPeriod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiscalPeriodRepository extends JpaRepository<FiscalPeriod, Long> {

}
