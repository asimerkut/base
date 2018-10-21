package com.er.fin.repository;

import com.er.fin.domain.DefPivot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the DefPivot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefPivotRepository extends JpaRepository<DefPivot, Long> {

}
