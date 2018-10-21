package com.er.fin.repository;

import com.er.fin.domain.PerCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the PerCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerCompanyRepository extends JpaRepository<PerCompany, Long> {

}
