package com.er.base.repository;

import com.er.base.domain.DefAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DefAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefAnswerRepository extends JpaRepository<DefAnswer, Long> {

}
