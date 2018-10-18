package com.er.base.repository;

import com.er.base.domain.DefPivot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefPivot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefPivotRepository extends JpaRepository<DefPivot, Long> {

}
