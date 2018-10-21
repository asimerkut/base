package com.er.base.repository.search;

import com.er.base.domain.PerExcuse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerExcuse entity.
 */
public interface PerExcuseSearchRepository extends ElasticsearchRepository<PerExcuse, Long> {
}
