package com.er.base.repository.search;

import com.er.base.domain.PerValue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerValue entity.
 */
public interface PerValueSearchRepository extends ElasticsearchRepository<PerValue, Long> {
}
