package com.er.base.repository;

import com.er.base.domain.DefField;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefField entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefFieldRepository extends JpaRepository<DefField, Long> {

}
