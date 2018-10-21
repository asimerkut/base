package com.er.base.repository.search;

import com.er.base.domain.DefItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DefItem entity.
 */
public interface DefItemSearchRepository extends ElasticsearchRepository<DefItem, Long> {
}
