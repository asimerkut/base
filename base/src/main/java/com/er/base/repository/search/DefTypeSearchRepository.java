package com.er.base.repository.search;

import com.er.base.domain.DefType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DefType entity.
 */
public interface DefTypeSearchRepository extends ElasticsearchRepository<DefType, Long> {
}
