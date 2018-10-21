package com.er.base.repository.search;

import com.er.base.domain.FiscalPeriod;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FiscalPeriod entity.
 */
public interface FiscalPeriodSearchRepository extends ElasticsearchRepository<FiscalPeriod, Long> {
}
