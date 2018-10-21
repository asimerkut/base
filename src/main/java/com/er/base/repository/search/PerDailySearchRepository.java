package com.er.base.repository.search;

import com.er.base.domain.PerDaily;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerDaily entity.
 */
public interface PerDailySearchRepository extends ElasticsearchRepository<PerDaily, Long> {
}
