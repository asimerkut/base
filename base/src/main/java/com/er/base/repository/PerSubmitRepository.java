package com.er.base.repository;

import com.er.base.domain.DefItem;
import com.er.base.domain.PerPerson;
import com.er.base.domain.PerSubmit;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data  repository for the PerSubmit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerSubmitRepository extends JpaRepository<PerSubmit, Long> {


}
