package com.er.base.repository.search;

import com.er.base.domain.DefField;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DefField entity.
 */
public interface DefFieldSearchRepository extends ElasticsearchRepository<DefField, Long> {
}
