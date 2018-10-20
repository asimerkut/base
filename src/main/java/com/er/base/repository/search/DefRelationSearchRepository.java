package com.er.base.repository.search;

import com.er.base.domain.DefRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DefRelation entity.
 */
public interface DefRelationSearchRepository extends ElasticsearchRepository<DefRelation, Long> {
}
