package com.er.base.repository.search;

import com.er.base.domain.FiscalDayoff;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FiscalDayoff entity.
 */
public interface FiscalDayoffSearchRepository extends ElasticsearchRepository<FiscalDayoff, Long> {
}
