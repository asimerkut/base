package com.er.base.repository;

import com.er.base.domain.DefItem;
import com.er.base.domain.enumeration.EnmType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the DefItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefItemRepository extends JpaRepository<DefItem, Long> {

    List<DefItem> findAllByTypeIdOrderByCode(Long typeId);

    List<DefItem> findAllByTypeCodeOrderByCode(EnmType enmType);

}
