package com.er.base.repository;

import com.er.base.domain.PerValue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerValueRepository extends JpaRepository<PerValue, Long> {

}
