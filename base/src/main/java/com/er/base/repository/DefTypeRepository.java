package com.er.base.repository;

import com.er.base.domain.DefType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefTypeRepository extends JpaRepository<DefType, Long> {

    DefType getDefTypeByCode(String enmType);

}
