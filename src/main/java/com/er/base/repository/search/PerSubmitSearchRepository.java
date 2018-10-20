package com.er.base.repository.search;

import com.er.base.domain.PerSubmit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerSubmit entity.
 */
public interface PerSubmitSearchRepository extends ElasticsearchRepository<PerSubmit, Long> {
}
