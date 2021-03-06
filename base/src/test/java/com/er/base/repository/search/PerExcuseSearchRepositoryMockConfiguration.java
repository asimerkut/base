package com.er.base.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of PerExcuseSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PerExcuseSearchRepositoryMockConfiguration {

    @MockBean
    private PerExcuseSearchRepository mockPerExcuseSearchRepository;

}
