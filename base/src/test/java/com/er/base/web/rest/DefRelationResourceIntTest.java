package com.er.base.web.rest;

import com.er.base.BaseApp;

import com.er.base.domain.DefRelation;
import com.er.base.domain.DefType;
import com.er.base.repository.DefRelationRepository;
import com.er.base.repository.search.DefRelationSearchRepository;
import com.er.base.service.DefRelationService;
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

import com.er.base.domain.enumeration.EnmParam;
/**
 * Test class for the DefRelationResource REST controller.
 *
 * @see DefRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BaseApp.class)
public class DefRelationResourceIntTest {

    private static final EnmParam DEFAULT_PARAMETER = EnmParam.GORV_MA_KAR;
    private static final EnmParam UPDATED_PARAMETER = EnmParam.GORV_EK_ZOR;

    @Autowired
    private DefRelationRepository defRelationRepository;
    
    @Autowired
    private DefRelationService defRelationService;

    /**
     * This repository is mocked in the com.er.base.repository.search test package.
     *
     * @see com.er.base.repository.search.DefRelationSearchRepositoryMockConfiguration
     */
    @Autowired
    private DefRelationSearchRepository mockDefRelationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDefRelationMockMvc;

    private DefRelation defRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DefRelationResource defRelationResource = new DefRelationResource(defRelationService);
        this.restDefRelationMockMvc = MockMvcBuilders.standaloneSetup(defRelationResource)
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
    public static DefRelation createEntity(EntityManager em) {
        DefRelation defRelation = new DefRelation()
            .parameter(DEFAULT_PARAMETER);
        // Add required entity
        DefType defType = DefTypeResourceIntTest.createEntity(em);
        em.persist(defType);
        em.flush();
        defRelation.setTypeSource(defType);
        return defRelation;
    }

    @Before
    public void initTest() {
        defRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createDefRelation() throws Exception {
        int databaseSizeBeforeCreate = defRelationRepository.findAll().size();

        // Create the DefRelation
        restDefRelationMockMvc.perform(post("/api/def-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defRelation)))
            .andExpect(status().isCreated());

        // Validate the DefRelation in the database
        List<DefRelation> defRelationList = defRelationRepository.findAll();
        assertThat(defRelationList).hasSize(databaseSizeBeforeCreate + 1);
        DefRelation testDefRelation = defRelationList.get(defRelationList.size() - 1);
        assertThat(testDefRelation.getParameter()).isEqualTo(DEFAULT_PARAMETER);

        // Validate the DefRelation in Elasticsearch
        verify(mockDefRelationSearchRepository, times(1)).save(testDefRelation);
    }

    @Test
    @Transactional
    public void createDefRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = defRelationRepository.findAll().size();

        // Create the DefRelation with an existing ID
        defRelation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefRelationMockMvc.perform(post("/api/def-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defRelation)))
            .andExpect(status().isBadRequest());

        // Validate the DefRelation in the database
        List<DefRelation> defRelationList = defRelationRepository.findAll();
        assertThat(defRelationList).hasSize(databaseSizeBeforeCreate);

        // Validate the DefRelation in Elasticsearch
        verify(mockDefRelationSearchRepository, times(0)).save(defRelation);
    }

    @Test
    @Transactional
    public void getAllDefRelations() throws Exception {
        // Initialize the database
        defRelationRepository.saveAndFlush(defRelation);

        // Get all the defRelationList
        restDefRelationMockMvc.perform(get("/api/def-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].parameter").value(hasItem(DEFAULT_PARAMETER.toString())));
    }
    
    @Test
    @Transactional
    public void getDefRelation() throws Exception {
        // Initialize the database
        defRelationRepository.saveAndFlush(defRelation);

        // Get the defRelation
        restDefRelationMockMvc.perform(get("/api/def-relations/{id}", defRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(defRelation.getId().intValue()))
            .andExpect(jsonPath("$.parameter").value(DEFAULT_PARAMETER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDefRelation() throws Exception {
        // Get the defRelation
        restDefRelationMockMvc.perform(get("/api/def-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDefRelation() throws Exception {
        // Initialize the database
        defRelationService.save(defRelation);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockDefRelationSearchRepository);

        int databaseSizeBeforeUpdate = defRelationRepository.findAll().size();

        // Update the defRelation
        DefRelation updatedDefRelation = defRelationRepository.findById(defRelation.getId()).get();
        // Disconnect from session so that the updates on updatedDefRelation are not directly saved in db
        em.detach(updatedDefRelation);
        updatedDefRelation
            .parameter(UPDATED_PARAMETER);

        restDefRelationMockMvc.perform(put("/api/def-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDefRelation)))
            .andExpect(status().isOk());

        // Validate the DefRelation in the database
        List<DefRelation> defRelationList = defRelationRepository.findAll();
        assertThat(defRelationList).hasSize(databaseSizeBeforeUpdate);
        DefRelation testDefRelation = defRelationList.get(defRelationList.size() - 1);
        assertThat(testDefRelation.getParameter()).isEqualTo(UPDATED_PARAMETER);

        // Validate the DefRelation in Elasticsearch
        verify(mockDefRelationSearchRepository, times(1)).save(testDefRelation);
    }

    @Test
    @Transactional
    public void updateNonExistingDefRelation() throws Exception {
        int databaseSizeBeforeUpdate = defRelationRepository.findAll().size();

        // Create the DefRelation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDefRelationMockMvc.perform(put("/api/def-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defRelation)))
            .andExpect(status().isBadRequest());

        // Validate the DefRelation in the database
        List<DefRelation> defRelationList = defRelationRepository.findAll();
        assertThat(defRelationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DefRelation in Elasticsearch
        verify(mockDefRelationSearchRepository, times(0)).save(defRelation);
    }

    @Test
    @Transactional
    public void deleteDefRelation() throws Exception {
        // Initialize the database
        defRelationService.save(defRelation);

        int databaseSizeBeforeDelete = defRelationRepository.findAll().size();

        // Get the defRelation
        restDefRelationMockMvc.perform(delete("/api/def-relations/{id}", defRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DefRelation> defRelationList = defRelationRepository.findAll();
        assertThat(defRelationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DefRelation in Elasticsearch
        verify(mockDefRelationSearchRepository, times(1)).deleteById(defRelation.getId());
    }

    @Test
    @Transactional
    public void searchDefRelation() throws Exception {
        // Initialize the database
        defRelationService.save(defRelation);
        when(mockDefRelationSearchRepository.search(queryStringQuery("id:" + defRelation.getId())))
            .thenReturn(Collections.singletonList(defRelation));
        // Search the defRelation
        restDefRelationMockMvc.perform(get("/api/_search/def-relations?query=id:" + defRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].parameter").value(hasItem(DEFAULT_PARAMETER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DefRelation.class);
        DefRelation defRelation1 = new DefRelation();
        defRelation1.setId(1L);
        DefRelation defRelation2 = new DefRelation();
        defRelation2.setId(defRelation1.getId());
        assertThat(defRelation1).isEqualTo(defRelation2);
        defRelation2.setId(2L);
        assertThat(defRelation1).isNotEqualTo(defRelation2);
        defRelation1.setId(null);
        assertThat(defRelation1).isNotEqualTo(defRelation2);
    }
}
