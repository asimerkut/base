package com.er.base.repository;

import com.er.base.domain.PerExcuse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerExcuse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerExcuseRepository extends JpaRepository<PerExcuse, Long> {

}
