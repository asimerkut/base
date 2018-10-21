package com.er.base.web.rest;

import com.er.base.BaseApp;

import com.er.base.domain.FiscalYear;
import com.er.base.repository.FiscalYearRepository;
import com.er.base.repository.search.FiscalYearSearchRepository;
import com.er.base.service.FiscalYearService;
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
 * Test class for the FiscalYearResource REST controller.
 *
 * @see FiscalYearResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BaseApp.class)
public class FiscalYearResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FINISH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FINISH = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FiscalYearRepository fiscalYearRepository;
    
    @Autowired
    private FiscalYearService fiscalYearService;

    /**
     * This repository is mocked in the com.er.base.repository.search test package.
     *
     * @see com.er.base.repository.search.FiscalYearSearchRepositoryMockConfiguration
     */
    @Autowired
    private FiscalYearSearchRepository mockFiscalYearSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFiscalYearMockMvc;

    private FiscalYear fiscalYear;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FiscalYearResource fiscalYearResource = new FiscalYearResource(fiscalYearService);
        this.restFiscalYearMockMvc = MockMvcBuilders.standaloneSetup(fiscalYearResource)
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
    public static FiscalYear createEntity(EntityManager em) {
        FiscalYear fiscalYear = new FiscalYear()
            .code(DEFAULT_CODE)
            .dateStart(DEFAULT_DATE_START)
            .dateFinish(DEFAULT_DATE_FINISH);
        return fiscalYear;
    }

    @Before
    public void initTest() {
        fiscalYear = createEntity(em);
    }

    @Test
    @Transactional
    public void createFiscalYear() throws Exception {
        int databaseSizeBeforeCreate = fiscalYearRepository.findAll().size();

        // Create the FiscalYear
        restFiscalYearMockMvc.perform(post("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isCreated());

        // Validate the FiscalYear in the database
        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeCreate + 1);
        FiscalYear testFiscalYear = fiscalYearList.get(fiscalYearList.size() - 1);
        assertThat(testFiscalYear.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testFiscalYear.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testFiscalYear.getDateFinish()).isEqualTo(DEFAULT_DATE_FINISH);

        // Validate the FiscalYear in Elasticsearch
        verify(mockFiscalYearSearchRepository, times(1)).save(testFiscalYear);
    }

    @Test
    @Transactional
    public void createFiscalYearWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fiscalYearRepository.findAll().size();

        // Create the FiscalYear with an existing ID
        fiscalYear.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiscalYearMockMvc.perform(post("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalYear in the database
        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeCreate);

        // Validate the FiscalYear in Elasticsearch
        verify(mockFiscalYearSearchRepository, times(0)).save(fiscalYear);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalYearRepository.findAll().size();
        // set the field null
        fiscalYear.setCode(null);

        // Create the FiscalYear, which fails.

        restFiscalYearMockMvc.perform(post("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isBadRequest());

        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalYearRepository.findAll().size();
        // set the field null
        fiscalYear.setDateStart(null);

        // Create the FiscalYear, which fails.

        restFiscalYearMockMvc.perform(post("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isBadRequest());

        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinishIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalYearRepository.findAll().size();
        // set the field null
        fiscalYear.setDateFinish(null);

        // Create the FiscalYear, which fails.

        restFiscalYearMockMvc.perform(post("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isBadRequest());

        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFiscalYears() throws Exception {
        // Initialize the database
        fiscalYearRepository.saveAndFlush(fiscalYear);

        // Get all the fiscalYearList
        restFiscalYearMockMvc.perform(get("/api/fiscal-years?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalYear.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateFinish").value(hasItem(DEFAULT_DATE_FINISH.toString())));
    }
    
    @Test
    @Transactional
    public void getFiscalYear() throws Exception {
        // Initialize the database
        fiscalYearRepository.saveAndFlush(fiscalYear);

        // Get the fiscalYear
        restFiscalYearMockMvc.perform(get("/api/fiscal-years/{id}", fiscalYear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fiscalYear.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dateFinish").value(DEFAULT_DATE_FINISH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFiscalYear() throws Exception {
        // Get the fiscalYear
        restFiscalYearMockMvc.perform(get("/api/fiscal-years/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFiscalYear() throws Exception {
        // Initialize the database
        fiscalYearService.save(fiscalYear);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockFiscalYearSearchRepository);

        int databaseSizeBeforeUpdate = fiscalYearRepository.findAll().size();

        // Update the fiscalYear
        FiscalYear updatedFiscalYear = fiscalYearRepository.findById(fiscalYear.getId()).get();
        // Disconnect from session so that the updates on updatedFiscalYear are not directly saved in db
        em.detach(updatedFiscalYear);
        updatedFiscalYear
            .code(UPDATED_CODE)
            .dateStart(UPDATED_DATE_START)
            .dateFinish(UPDATED_DATE_FINISH);

        restFiscalYearMockMvc.perform(put("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFiscalYear)))
            .andExpect(status().isOk());

        // Validate the FiscalYear in the database
        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeUpdate);
        FiscalYear testFiscalYear = fiscalYearList.get(fiscalYearList.size() - 1);
        assertThat(testFiscalYear.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testFiscalYear.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testFiscalYear.getDateFinish()).isEqualTo(UPDATED_DATE_FINISH);

        // Validate the FiscalYear in Elasticsearch
        verify(mockFiscalYearSearchRepository, times(1)).save(testFiscalYear);
    }

    @Test
    @Transactional
    public void updateNonExistingFiscalYear() throws Exception {
        int databaseSizeBeforeUpdate = fiscalYearRepository.findAll().size();

        // Create the FiscalYear

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiscalYearMockMvc.perform(put("/api/fiscal-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalYear)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalYear in the database
        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FiscalYear in Elasticsearch
        verify(mockFiscalYearSearchRepository, times(0)).save(fiscalYear);
    }

    @Test
    @Transactional
    public void deleteFiscalYear() throws Exception {
        // Initialize the database
        fiscalYearService.save(fiscalYear);

        int databaseSizeBeforeDelete = fiscalYearRepository.findAll().size();

        // Get the fiscalYear
        restFiscalYearMockMvc.perform(delete("/api/fiscal-years/{id}", fiscalYear.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FiscalYear> fiscalYearList = fiscalYearRepository.findAll();
        assertThat(fiscalYearList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FiscalYear in Elasticsearch
        verify(mockFiscalYearSearchRepository, times(1)).deleteById(fiscalYear.getId());
    }

    @Test
    @Transactional
    public void searchFiscalYear() throws Exception {
        // Initialize the database
        fiscalYearService.save(fiscalYear);
        when(mockFiscalYearSearchRepository.search(queryStringQuery("id:" + fiscalYear.getId())))
            .thenReturn(Collections.singletonList(fiscalYear));
        // Search the fiscalYear
        restFiscalYearMockMvc.perform(get("/api/_search/fiscal-years?query=id:" + fiscalYear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalYear.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateFinish").value(hasItem(DEFAULT_DATE_FINISH.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FiscalYear.class);
        FiscalYear fiscalYear1 = new FiscalYear();
        fiscalYear1.setId(1L);
        FiscalYear fiscalYear2 = new FiscalYear();
        fiscalYear2.setId(fiscalYear1.getId());
        assertThat(fiscalYear1).isEqualTo(fiscalYear2);
        fiscalYear2.setId(2L);
        assertThat(fiscalYear1).isNotEqualTo(fiscalYear2);
        fiscalYear1.setId(null);
        assertThat(fiscalYear1).isNotEqualTo(fiscalYear2);
    }
}
