package com.er.base.web.rest;

import com.er.base.BaseApp;

import com.er.base.domain.PerDaily;
import com.er.base.repository.PerDailyRepository;
import com.er.base.repository.search.PerDailySearchRepository;
import com.er.base.service.PerDailyService;
import com.er.base.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.er.base.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PerDailyResource REST controller.
 *
 * @see PerDailyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BaseApp.class)
public class PerDailyResourceIntTest {

    private static final Integer DEFAULT_DERS_SIRA = 15;
    private static final Integer UPDATED_DERS_SIRA = 14;

    private static final String DEFAULT_HOUR_START = "AAAAA";
    private static final String UPDATED_HOUR_START = "BBBBB";

    private static final String DEFAULT_HOUR_FINISH = "AAAAA";
    private static final String UPDATED_HOUR_FINISH = "BBBBB";

    @Autowired
    private PerDailyRepository perDailyRepository;
    
    @Autowired
    private PerDailyService perDailyService;

    /**
     * This repository is mocked in the com.er.base.repository.search test package.
     *
     * @see com.er.base.repository.search.PerDailySearchRepositoryMockConfiguration
     */
    @Autowired
    private PerDailySearchRepository mockPerDailySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPerDailyMockMvc;

    private PerDaily perDaily;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerDailyResource perDailyResource = new PerDailyResource(perDailyService);
        this.restPerDailyMockMvc = MockMvcBuilders.standaloneSetup(perDailyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerDaily createEntity(EntityManager em) {
        PerDaily perDaily = new PerDaily()
            .dersSira(DEFAULT_DERS_SIRA)
            .hourStart(DEFAULT_HOUR_START)
            .hourFinish(DEFAULT_HOUR_FINISH);
        return perDaily;
    }

    @Before
    public void initTest() {
        perDaily = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerDaily() throws Exception {
        int databaseSizeBeforeCreate = perDailyRepository.findAll().size();

        // Create the PerDaily
        restPerDailyMockMvc.perform(post("/api/per-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perDaily)))
            .andExpect(status().isCreated());

        // Validate the PerDaily in the database
        List<PerDaily> perDailyList = perDailyRepository.findAll();
        assertThat(perDailyList).hasSize(databaseSizeBeforeCreate + 1);
        PerDaily testPerDaily = perDailyList.get(perDailyList.size() - 1);
        assertThat(testPerDaily.getDersSira()).isEqualTo(DEFAULT_DERS_SIRA);
        assertThat(testPerDaily.getHourStart()).isEqualTo(DEFAULT_HOUR_START);
        assertThat(testPerDaily.getHourFinish()).isEqualTo(DEFAULT_HOUR_FINISH);

        // Validate the PerDaily in Elasticsearch
        verify(mockPerDailySearchRepository, times(1)).save(testPerDaily);
    }

    @Test
    @Transactional
    public void createPerDailyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perDailyRepository.findAll().size();

        // Create the PerDaily with an existing ID
        perDaily.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerDailyMockMvc.perform(post("/api/per-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perDaily)))
            .andExpect(status().isBadRequest());

        // Validate the PerDaily in the database
        List<PerDaily> perDailyList = perDailyRepository.findAll();
        assertThat(perDailyList).hasSize(databaseSizeBeforeCreate);

        // Validate the PerDaily in Elasticsearch
        verify(mockPerDailySearchRepository, times(0)).save(perDaily);
    }

    @Test
    @Transactional
    public void getAllPerDailies() throws Exception {
        // Initialize the database
        perDailyRepository.saveAndFlush(perDaily);

        // Get all the perDailyList
        restPerDailyMockMvc.perform(get("/api/per-dailies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perDaily.getId().intValue())))
            .andExpect(jsonPath("$.[*].dersSira").value(hasItem(DEFAULT_DERS_SIRA)))
            .andExpect(jsonPath("$.[*].hourStart").value(hasItem(DEFAULT_HOUR_START.toString())))
            .andExpect(jsonPath("$.[*].hourFinish").value(hasItem(DEFAULT_HOUR_FINISH.toString())));
    }
    
    @Test
    @Transactional
    public void getPerDaily() throws Exception {
        // Initialize the database
        perDailyRepository.saveAndFlush(perDaily);

        // Get the perDaily
        restPerDailyMockMvc.perform(get("/api/per-dailies/{id}", perDaily.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perDaily.getId().intValue()))
            .andExpect(jsonPath("$.dersSira").value(DEFAULT_DERS_SIRA))
            .andExpect(jsonPath("$.hourStart").value(DEFAULT_HOUR_START.toString()))
            .andExpect(jsonPath("$.hourFinish").value(DEFAULT_HOUR_FINISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPerDaily() throws Exception {
        // Get the perDaily
        restPerDailyMockMvc.perform(get("/api/per-dailies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerDaily() throws Exception {
        // Initialize the database
        perDailyService.save(perDaily);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockPerDailySearchRepository);

        int databaseSizeBeforeUpdate = perDailyRepository.findAll().size();

        // Update the perDaily
        PerDaily updatedPerDaily = perDailyRepository.findById(perDaily.getId()).get();
        // Disconnect from session so that the updates on updatedPerDaily are not directly saved in db
        em.detach(updatedPerDaily);
        updatedPerDaily
            .dersSira(UPDATED_DERS_SIRA)
            .hourStart(UPDATED_HOUR_START)
            .hourFinish(UPDATED_HOUR_FINISH);

        restPerDailyMockMvc.perform(put("/api/per-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerDaily)))
            .andExpect(status().isOk());

        // Validate the PerDaily in the database
        List<PerDaily> perDailyList = perDailyRepository.findAll();
        assertThat(perDailyList).hasSize(databaseSizeBeforeUpdate);
        PerDaily testPerDaily = perDailyList.get(perDailyList.size() - 1);
        assertThat(testPerDaily.getDersSira()).isEqualTo(UPDATED_DERS_SIRA);
        assertThat(testPerDaily.getHourStart()).isEqualTo(UPDATED_HOUR_START);
        assertThat(testPerDaily.getHourFinish()).isEqualTo(UPDATED_HOUR_FINISH);

        // Validate the PerDaily in Elasticsearch
        verify(mockPerDailySearchRepository, times(1)).save(testPerDaily);
    }

    @Test
    @Transactional
    public void updateNonExistingPerDaily() throws Exception {
        int databaseSizeBeforeUpdate = perDailyRepository.findAll().size();

        // Create the PerDaily

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerDailyMockMvc.perform(put("/api/per-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perDaily)))
            .andExpect(status().isBadRequest());

        // Validate the PerDaily in the database
        List<PerDaily> perDailyList = perDailyRepository.findAll();
        assertThat(perDailyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PerDaily in Elasticsearch
        verify(mockPerDailySearchRepository, times(0)).save(perDaily);
    }

    @Test
    @Transactional
    public void deletePerDaily() throws Exception {
        // Initialize the database
        perDailyService.save(perDaily);

        int databaseSizeBeforeDelete = perDailyRepository.findAll().size();

        // Get the perDaily
        restPerDailyMockMvc.perform(delete("/api/per-dailies/{id}", perDaily.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PerDaily> perDailyList = perDailyRepository.findAll();
        assertThat(perDailyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PerDaily in Elasticsearch
        verify(mockPerDailySearchRepository, times(1)).deleteById(perDaily.getId());
    }

    @Test
    @Transactional
    public void searchPerDaily() throws Exception {
        // Initialize the database
        perDailyService.save(perDaily);
        when(mockPerDailySearchRepository.search(queryStringQuery("id:" + perDaily.getId())))
            .thenReturn(Collections.singletonList(perDaily));
        // Search the perDaily
        restPerDailyMockMvc.perform(get("/api/_search/per-dailies?query=id:" + perDaily.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perDaily.getId().intValue())))
            .andExpect(jsonPath("$.[*].dersSira").value(hasItem(DEFAULT_DERS_SIRA)))
            .andExpect(jsonPath("$.[*].hourStart").value(hasItem(DEFAULT_HOUR_START.toString())))
            .andExpect(jsonPath("$.[*].hourFinish").value(hasItem(DEFAULT_HOUR_FINISH.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerDaily.class);
        PerDaily perDaily1 = new PerDaily();
        perDaily1.setId(1L);
        PerDaily perDaily2 = new PerDaily();
        perDaily2.setId(perDaily1.getId());
        assertThat(perDaily1).isEqualTo(perDaily2);
        perDaily2.setId(2L);
        assertThat(perDaily1).isNotEqualTo(perDaily2);
        perDaily1.setId(null);
        assertThat(perDaily1).isNotEqualTo(perDaily2);
    }
}
