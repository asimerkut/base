package com.er.fin.repository;

import com.er.fin.domain.DefRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the DefRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefRelationRepository extends JpaRepository<DefRelation, Long> {

    List<DefRelation> findAllByTypeSourceId(Long id);

}
