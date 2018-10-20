package com.er.base.repository.search;

import com.er.base.domain.PerCompany;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerCompany entity.
 */
public interface PerCompanySearchRepository extends ElasticsearchRepository<PerCompany, Long> {
}
