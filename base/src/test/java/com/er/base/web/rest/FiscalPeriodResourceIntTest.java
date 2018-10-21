package com.er.base.web.rest;

import com.er.base.BaseApp;

import com.er.base.domain.FiscalPeriod;
import com.er.base.repository.FiscalPeriodRepository;
import com.er.base.repository.search.FiscalPeriodSearchRepository;
import com.er.base.service.FiscalPeriodService;
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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Test class for the FiscalPeriodResource REST controller.
 *
 * @see FiscalPeriodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BaseApp.class)
public class FiscalPeriodResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FINISH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FINISH = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_STATE = 1;
    private static final Integer UPDATED_STATE = 2;

    @Autowired
    private FiscalPeriodRepository fiscalPeriodRepository;
    
    @Autowired
    private FiscalPeriodService fiscalPeriodService;

    /**
     * This repository is mocked in the com.er.base.repository.search test package.
     *
     * @see com.er.base.repository.search.FiscalPeriodSearchRepositoryMockConfiguration
     */
    @Autowired
    private FiscalPeriodSearchRepository mockFiscalPeriodSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFiscalPeriodMockMvc;

    private FiscalPeriod fiscalPeriod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FiscalPeriodResource fiscalPeriodResource = new FiscalPeriodResource(fiscalPeriodService);
        this.restFiscalPeriodMockMvc = MockMvcBuilders.standaloneSetup(fiscalPeriodResource)
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
    public static FiscalPeriod createEntity(EntityManager em) {
        FiscalPeriod fiscalPeriod = new FiscalPeriod()
            .code(DEFAULT_CODE)
            .dateStart(DEFAULT_DATE_START)
            .dateFinish(DEFAULT_DATE_FINISH)
            .state(DEFAULT_STATE);
        return fiscalPeriod;
    }

    @Before
    public void initTest() {
        fiscalPeriod = createEntity(em);
    }

    @Test
    @Transactional
    public void createFiscalPeriod() throws Exception {
        int databaseSizeBeforeCreate = fiscalPeriodRepository.findAll().size();

        // Create the FiscalPeriod
        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isCreated());

        // Validate the FiscalPeriod in the database
        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeCreate + 1);
        FiscalPeriod testFiscalPeriod = fiscalPeriodList.get(fiscalPeriodList.size() - 1);
        assertThat(testFiscalPeriod.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testFiscalPeriod.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testFiscalPeriod.getDateFinish()).isEqualTo(DEFAULT_DATE_FINISH);
        assertThat(testFiscalPeriod.getState()).isEqualTo(DEFAULT_STATE);

        // Validate the FiscalPeriod in Elasticsearch
        verify(mockFiscalPeriodSearchRepository, times(1)).save(testFiscalPeriod);
    }

    @Test
    @Transactional
    public void createFiscalPeriodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fiscalPeriodRepository.findAll().size();

        // Create the FiscalPeriod with an existing ID
        fiscalPeriod.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalPeriod in the database
        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeCreate);

        // Validate the FiscalPeriod in Elasticsearch
        verify(mockFiscalPeriodSearchRepository, times(0)).save(fiscalPeriod);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalPeriodRepository.findAll().size();
        // set the field null
        fiscalPeriod.setCode(null);

        // Create the FiscalPeriod, which fails.

        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalPeriodRepository.findAll().size();
        // set the field null
        fiscalPeriod.setDateStart(null);

        // Create the FiscalPeriod, which fails.

        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinishIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalPeriodRepository.findAll().size();
        // set the field null
        fiscalPeriod.setDateFinish(null);

        // Create the FiscalPeriod, which fails.

        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalPeriodRepository.findAll().size();
        // set the field null
        fiscalPeriod.setState(null);

        // Create the FiscalPeriod, which fails.

        restFiscalPeriodMockMvc.perform(post("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFiscalPeriods() throws Exception {
        // Initialize the database
        fiscalPeriodRepository.saveAndFlush(fiscalPeriod);

        // Get all the fiscalPeriodList
        restFiscalPeriodMockMvc.perform(get("/api/fiscal-periods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalPeriod.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateFinish").value(hasItem(DEFAULT_DATE_FINISH.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)));
    }
    
    @Test
    @Transactional
    public void getFiscalPeriod() throws Exception {
        // Initialize the database
        fiscalPeriodRepository.saveAndFlush(fiscalPeriod);

        // Get the fiscalPeriod
        restFiscalPeriodMockMvc.perform(get("/api/fiscal-periods/{id}", fiscalPeriod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fiscalPeriod.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dateFinish").value(DEFAULT_DATE_FINISH.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE));
    }

    @Test
    @Transactional
    public void getNonExistingFiscalPeriod() throws Exception {
        // Get the fiscalPeriod
        restFiscalPeriodMockMvc.perform(get("/api/fiscal-periods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFiscalPeriod() throws Exception {
        // Initialize the database
        fiscalPeriodService.save(fiscalPeriod);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockFiscalPeriodSearchRepository);

        int databaseSizeBeforeUpdate = fiscalPeriodRepository.findAll().size();

        // Update the fiscalPeriod
        FiscalPeriod updatedFiscalPeriod = fiscalPeriodRepository.findById(fiscalPeriod.getId()).get();
        // Disconnect from session so that the updates on updatedFiscalPeriod are not directly saved in db
        em.detach(updatedFiscalPeriod);
        updatedFiscalPeriod
            .code(UPDATED_CODE)
            .dateStart(UPDATED_DATE_START)
            .dateFinish(UPDATED_DATE_FINISH)
            .state(UPDATED_STATE);

        restFiscalPeriodMockMvc.perform(put("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFiscalPeriod)))
            .andExpect(status().isOk());

        // Validate the FiscalPeriod in the database
        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeUpdate);
        FiscalPeriod testFiscalPeriod = fiscalPeriodList.get(fiscalPeriodList.size() - 1);
        assertThat(testFiscalPeriod.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testFiscalPeriod.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testFiscalPeriod.getDateFinish()).isEqualTo(UPDATED_DATE_FINISH);
        assertThat(testFiscalPeriod.getState()).isEqualTo(UPDATED_STATE);

        // Validate the FiscalPeriod in Elasticsearch
        verify(mockFiscalPeriodSearchRepository, times(1)).save(testFiscalPeriod);
    }

    @Test
    @Transactional
    public void updateNonExistingFiscalPeriod() throws Exception {
        int databaseSizeBeforeUpdate = fiscalPeriodRepository.findAll().size();

        // Create the FiscalPeriod

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiscalPeriodMockMvc.perform(put("/api/fiscal-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalPeriod)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalPeriod in the database
        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FiscalPeriod in Elasticsearch
        verify(mockFiscalPeriodSearchRepository, times(0)).save(fiscalPeriod);
    }

    @Test
    @Transactional
    public void deleteFiscalPeriod() throws Exception {
        // Initialize the database
        fiscalPeriodService.save(fiscalPeriod);

        int databaseSizeBeforeDelete = fiscalPeriodRepository.findAll().size();

        // Get the fiscalPeriod
        restFiscalPeriodMockMvc.perform(delete("/api/fiscal-periods/{id}", fiscalPeriod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FiscalPeriod> fiscalPeriodList = fiscalPeriodRepository.findAll();
        assertThat(fiscalPeriodList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FiscalPeriod in Elasticsearch
        verify(mockFiscalPeriodSearchRepository, times(1)).deleteById(fiscalPeriod.getId());
    }

    @Test
    @Transactional
    public void searchFiscalPeriod() throws Exception {
        // Initialize the database
        fiscalPeriodService.save(fiscalPeriod);
        when(mockFiscalPeriodSearchRepository.search(queryStringQuery("id:" + fiscalPeriod.getId())))
            .thenReturn(Collections.singletonList(fiscalPeriod));
        // Search the fiscalPeriod
        restFiscalPeriodMockMvc.perform(get("/api/_search/fiscal-periods?query=id:" + fiscalPeriod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalPeriod.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateFinish").value(hasItem(DEFAULT_DATE_FINISH.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FiscalPeriod.class);
        FiscalPeriod fiscalPeriod1 = new FiscalPeriod();
        fiscalPeriod1.setId(1L);
        FiscalPeriod fiscalPeriod2 = new FiscalPeriod();
        fiscalPeriod2.setId(fiscalPeriod1.getId());
        assertThat(fiscalPeriod1).isEqualTo(fiscalPeriod2);
        fiscalPeriod2.setId(2L);
        assertThat(fiscalPeriod1).isNotEqualTo(fiscalPeriod2);
        fiscalPeriod1.setId(null);
        assertThat(fiscalPeriod1).isNotEqualTo(fiscalPeriod2);
    }
}
