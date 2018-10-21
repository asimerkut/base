package com.er.base.repository;

import com.er.base.domain.PerPerson;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PerPerson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerPersonRepository extends JpaRepository<PerPerson, Long> {

    @Query("select per_person from PerPerson per_person where per_person.user.login = ?#{principal.username}")
    List<PerPerson> findByUserIsCurrentUser();

    @Query("select per_person from PerPerson per_person where per_person.user.login = ?#{principal.username}")
    PerPerson getPerson();

}
