package com.er.base.repository;

import com.er.base.domain.FiscalDayoff;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FiscalDayoff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiscalDayoffRepository extends JpaRepository<FiscalDayoff, Long> {

}
