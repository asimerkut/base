package com.er.base.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of DefRelationSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DefRelationSearchRepositoryMockConfiguration {

    @MockBean
    private DefRelationSearchRepository mockDefRelationSearchRepository;

}
