package com.er.base.repository.search;

import com.er.base.domain.FiscalYear;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FiscalYear entity.
 */
public interface FiscalYearSearchRepository extends ElasticsearchRepository<FiscalYear, Long> {
}
