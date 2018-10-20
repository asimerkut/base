package com.er.base.repository;

import com.er.base.domain.DefItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefItemRepository extends JpaRepository<DefItem, Long> {

}
