package com.er.base.repository;

import com.er.base.domain.PerPeriodState;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerPeriodState entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerPeriodStateRepository extends JpaRepository<PerPeriodState, Long> {

}
