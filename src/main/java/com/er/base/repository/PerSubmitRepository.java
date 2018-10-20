package com.er.base.repository;

import com.er.base.domain.PerSubmit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerSubmit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerSubmitRepository extends JpaRepository<PerSubmit, Long> {

}
