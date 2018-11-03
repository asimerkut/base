package com.er.base.web.rest;

import com.er.base.BaseApp;

import com.er.base.domain.FiscalDayoff;
import com.er.base.repository.FiscalDayoffRepository;
import com.er.base.repository.search.FiscalDayoffSearchRepository;
import com.er.base.service.FiscalDayoffService;
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

import com.er.base.domain.enumeration.EnmDayOff;
/**
 * Test class for the FiscalDayoffResource REST controller.
 *
 * @see FiscalDayoffResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BaseApp.class)
public class FiscalDayoffResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_START = LocalDate.now(ZoneId.systemDefault());

    private static final EnmDayOff DEFAULT_DAYOFF_TYPE = EnmDayOff.ALL;
    private static final EnmDayOff UPDATED_DAYOFF_TYPE = EnmDayOff.OO;

    @Autowired
    private FiscalDayoffRepository fiscalDayoffRepository;
    
    @Autowired
    private FiscalDayoffService fiscalDayoffService;

    /**
     * This repository is mocked in the com.er.base.repository.search test package.
     *
     * @see com.er.base.repository.search.FiscalDayoffSearchRepositoryMockConfiguration
     */
    @Autowired
    private FiscalDayoffSearchRepository mockFiscalDayoffSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFiscalDayoffMockMvc;

    private FiscalDayoff fiscalDayoff;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FiscalDayoffResource fiscalDayoffResource = new FiscalDayoffResource(fiscalDayoffService);
        this.restFiscalDayoffMockMvc = MockMvcBuilders.standaloneSetup(fiscalDayoffResource)
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
    public static FiscalDayoff createEntity(EntityManager em) {
        FiscalDayoff fiscalDayoff = new FiscalDayoff()
            .code(DEFAULT_CODE)
            .dateStart(DEFAULT_DATE_START)
            .dayoffType(DEFAULT_DAYOFF_TYPE);
        return fiscalDayoff;
    }

    @Before
    public void initTest() {
        fiscalDayoff = createEntity(em);
    }

    @Test
    @Transactional
    public void createFiscalDayoff() throws Exception {
        int databaseSizeBeforeCreate = fiscalDayoffRepository.findAll().size();

        // Create the FiscalDayoff
        restFiscalDayoffMockMvc.perform(post("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isCreated());

        // Validate the FiscalDayoff in the database
        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeCreate + 1);
        FiscalDayoff testFiscalDayoff = fiscalDayoffList.get(fiscalDayoffList.size() - 1);
        assertThat(testFiscalDayoff.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testFiscalDayoff.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testFiscalDayoff.getDayoffType()).isEqualTo(DEFAULT_DAYOFF_TYPE);

        // Validate the FiscalDayoff in Elasticsearch
        verify(mockFiscalDayoffSearchRepository, times(1)).save(testFiscalDayoff);
    }

    @Test
    @Transactional
    public void createFiscalDayoffWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fiscalDayoffRepository.findAll().size();

        // Create the FiscalDayoff with an existing ID
        fiscalDayoff.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiscalDayoffMockMvc.perform(post("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalDayoff in the database
        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeCreate);

        // Validate the FiscalDayoff in Elasticsearch
        verify(mockFiscalDayoffSearchRepository, times(0)).save(fiscalDayoff);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalDayoffRepository.findAll().size();
        // set the field null
        fiscalDayoff.setCode(null);

        // Create the FiscalDayoff, which fails.

        restFiscalDayoffMockMvc.perform(post("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isBadRequest());

        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalDayoffRepository.findAll().size();
        // set the field null
        fiscalDayoff.setDateStart(null);

        // Create the FiscalDayoff, which fails.

        restFiscalDayoffMockMvc.perform(post("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isBadRequest());

        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDayoffTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fiscalDayoffRepository.findAll().size();
        // set the field null
        fiscalDayoff.setDayoffType(null);

        // Create the FiscalDayoff, which fails.

        restFiscalDayoffMockMvc.perform(post("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isBadRequest());

        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFiscalDayoffs() throws Exception {
        // Initialize the database
        fiscalDayoffRepository.saveAndFlush(fiscalDayoff);

        // Get all the fiscalDayoffList
        restFiscalDayoffMockMvc.perform(get("/api/fiscal-dayoffs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalDayoff.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dayoffType").value(hasItem(DEFAULT_DAYOFF_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getFiscalDayoff() throws Exception {
        // Initialize the database
        fiscalDayoffRepository.saveAndFlush(fiscalDayoff);

        // Get the fiscalDayoff
        restFiscalDayoffMockMvc.perform(get("/api/fiscal-dayoffs/{id}", fiscalDayoff.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fiscalDayoff.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dayoffType").value(DEFAULT_DAYOFF_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFiscalDayoff() throws Exception {
        // Get the fiscalDayoff
        restFiscalDayoffMockMvc.perform(get("/api/fiscal-dayoffs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFiscalDayoff() throws Exception {
        // Initialize the database
        fiscalDayoffService.save(fiscalDayoff);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockFiscalDayoffSearchRepository);

        int databaseSizeBeforeUpdate = fiscalDayoffRepository.findAll().size();

        // Update the fiscalDayoff
        FiscalDayoff updatedFiscalDayoff = fiscalDayoffRepository.findById(fiscalDayoff.getId()).get();
        // Disconnect from session so that the updates on updatedFiscalDayoff are not directly saved in db
        em.detach(updatedFiscalDayoff);
        updatedFiscalDayoff
            .code(UPDATED_CODE)
            .dateStart(UPDATED_DATE_START)
            .dayoffType(UPDATED_DAYOFF_TYPE);

        restFiscalDayoffMockMvc.perform(put("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFiscalDayoff)))
            .andExpect(status().isOk());

        // Validate the FiscalDayoff in the database
        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeUpdate);
        FiscalDayoff testFiscalDayoff = fiscalDayoffList.get(fiscalDayoffList.size() - 1);
        assertThat(testFiscalDayoff.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testFiscalDayoff.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testFiscalDayoff.getDayoffType()).isEqualTo(UPDATED_DAYOFF_TYPE);

        // Validate the FiscalDayoff in Elasticsearch
        verify(mockFiscalDayoffSearchRepository, times(1)).save(testFiscalDayoff);
    }

    @Test
    @Transactional
    public void updateNonExistingFiscalDayoff() throws Exception {
        int databaseSizeBeforeUpdate = fiscalDayoffRepository.findAll().size();

        // Create the FiscalDayoff

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiscalDayoffMockMvc.perform(put("/api/fiscal-dayoffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalDayoff)))
            .andExpect(status().isBadRequest());

        // Validate the FiscalDayoff in the database
        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FiscalDayoff in Elasticsearch
        verify(mockFiscalDayoffSearchRepository, times(0)).save(fiscalDayoff);
    }

    @Test
    @Transactional
    public void deleteFiscalDayoff() throws Exception {
        // Initialize the database
        fiscalDayoffService.save(fiscalDayoff);

        int databaseSizeBeforeDelete = fiscalDayoffRepository.findAll().size();

        // Get the fiscalDayoff
        restFiscalDayoffMockMvc.perform(delete("/api/fiscal-dayoffs/{id}", fiscalDayoff.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FiscalDayoff> fiscalDayoffList = fiscalDayoffRepository.findAll();
        assertThat(fiscalDayoffList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FiscalDayoff in Elasticsearch
        verify(mockFiscalDayoffSearchRepository, times(1)).deleteById(fiscalDayoff.getId());
    }

    @Test
    @Transactional
    public void searchFiscalDayoff() throws Exception {
        // Initialize the database
        fiscalDayoffService.save(fiscalDayoff);
        when(mockFiscalDayoffSearchRepository.search(queryStringQuery("id:" + fiscalDayoff.getId())))
            .thenReturn(Collections.singletonList(fiscalDayoff));
        // Search the fiscalDayoff
        restFiscalDayoffMockMvc.perform(get("/api/_search/fiscal-dayoffs?query=id:" + fiscalDayoff.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalDayoff.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dayoffType").value(hasItem(DEFAULT_DAYOFF_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FiscalDayoff.class);
        FiscalDayoff fiscalDayoff1 = new FiscalDayoff();
        fiscalDayoff1.setId(1L);
        FiscalDayoff fiscalDayoff2 = new FiscalDayoff();
        fiscalDayoff2.setId(fiscalDayoff1.getId());
        assertThat(fiscalDayoff1).isEqualTo(fiscalDayoff2);
        fiscalDayoff2.setId(2L);
        assertThat(fiscalDayoff1).isNotEqualTo(fiscalDayoff2);
        fiscalDayoff1.setId(null);
        assertThat(fiscalDayoff1).isNotEqualTo(fiscalDayoff2);
    }
}
