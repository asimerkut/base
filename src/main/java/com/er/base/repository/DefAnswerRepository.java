package com.er.base.repository;

import com.er.base.domain.DefAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the DefAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefAnswerRepository extends JpaRepository<DefAnswer, Long> {

    List<DefAnswer> findAllByItemSourceId(Long id);

}
