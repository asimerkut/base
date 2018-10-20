package com.er.base.repository;

import com.er.base.domain.DefRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefRelationRepository extends JpaRepository<DefRelation, Long> {

}
