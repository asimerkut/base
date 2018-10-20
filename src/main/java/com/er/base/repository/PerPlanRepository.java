package com.er.base.repository;

import com.er.base.domain.PerPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerPlanRepository extends JpaRepository<PerPlan, Long> {

}
