package com.er.base.repository.search;

import com.er.base.domain.PerPeriodState;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerPeriodState entity.
 */
public interface PerPeriodStateSearchRepository extends ElasticsearchRepository<PerPeriodState, Long> {
}
