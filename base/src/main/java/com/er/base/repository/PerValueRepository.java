package com.er.base.repository;

import com.er.base.domain.PerPerson;
import com.er.base.domain.PerValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


/**
 * Spring Data  repository for the PerValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerValueRepository extends JpaRepository<PerValue, Long> {

    Set<PerValue> findAllByPerson(PerPerson perPerson);

}
