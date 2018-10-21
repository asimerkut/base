package com.er.fin.repository;

import com.er.fin.domain.DefType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the DefType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefTypeRepository extends JpaRepository<DefType, Long> {

}
