package com.er.base.repository.search;

import com.er.base.domain.PerPlan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerPlan entity.
 */
public interface PerPlanSearchRepository extends ElasticsearchRepository<PerPlan, Long> {
}
