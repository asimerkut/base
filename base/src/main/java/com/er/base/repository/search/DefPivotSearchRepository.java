package com.er.base.repository.search;

import com.er.base.domain.DefPivot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DefPivot entity.
 */
public interface DefPivotSearchRepository extends ElasticsearchRepository<DefPivot, Long> {
}
