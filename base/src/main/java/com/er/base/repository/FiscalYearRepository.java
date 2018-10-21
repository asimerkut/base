package com.er.base.repository;

import com.er.base.domain.FiscalYear;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FiscalYear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiscalYearRepository extends JpaRepository<FiscalYear, Long> {

}
