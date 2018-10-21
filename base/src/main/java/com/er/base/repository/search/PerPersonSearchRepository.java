package com.er.base.repository.search;

import com.er.base.domain.PerPerson;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerPerson entity.
 */
public interface PerPersonSearchRepository extends ElasticsearchRepository<PerPerson, Long> {
}
