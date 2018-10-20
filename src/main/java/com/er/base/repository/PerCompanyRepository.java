package com.er.base.repository;

import com.er.base.domain.PerCompany;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerCompanyRepository extends JpaRepository<PerCompany, Long> {

}
