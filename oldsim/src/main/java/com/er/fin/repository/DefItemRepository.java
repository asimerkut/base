package com.er.fin.repository;

import com.er.fin.domain.DefItem;
import com.er.fin.domain.enumeration.EnmType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the DefItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefItemRepository extends JpaRepository<DefItem, Long> {

    List<DefItem> findAllByTypeIdOrderByCode(Long typeId);

    List<DefItem> findAllByTypeCodeOrderByCode(EnmType enmType);


}
