package com.er.base.service.impl;

import com.er.base.service.DefPivotService;
import com.er.base.domain.DefPivot;
import com.er.base.repository.DefPivotRepository;
import com.er.base.repository.search.DefPivotSearchRepository;
import com.er.fin.dto.PivotDataDTO;
import org.hibernate.Session;
import org.hibernate.jdbc.ReturningWork;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing DefPivot.
 */
@Service
@Transactional
public class DefPivotServiceImpl implements DefPivotService {

    @PersistenceContext
    private EntityManager em;

    private final Logger log = LoggerFactory.getLogger(DefPivotServiceImpl.class);

    private DefPivotRepository defPivotRepository;

    private DefPivotSearchRepository defPivotSearchRepository;

    public DefPivotServiceImpl(EntityManager em, DefPivotRepository defPivotRepository, DefPivotSearchRepository defPivotSearchRepository) {
        this.em = em;
        this.defPivotRepository = defPivotRepository;
        this.defPivotSearchRepository = defPivotSearchRepository;
    }

    /**
     * Save a defPivot.
     *
     * @param defPivot the entity to save
     * @return the persisted entity
     */
    @Override
    public DefPivot save(DefPivot defPivot) {
        log.debug("Request to save DefPivot : {}", defPivot);
        DefPivot result = defPivotRepository.save(defPivot);
        defPivotSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the defPivots.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefPivot> findAll() {
        log.debug("Request to get all DefPivots");
        return defPivotRepository.findAll();
    }


    /**
     * Get one defPivot by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DefPivot> findOne(Long id) {
        log.debug("Request to get DefPivot : {}", id);
        return defPivotRepository.findById(id);
    }

    /**
     * Delete the defPivot by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DefPivot : {}", id);
        defPivotRepository.deleteById(id);
        defPivotSearchRepository.deleteById(id);
    }

    /**
     * Search for the defPivot corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DefPivot> search(String query) {
        log.debug("Request to search DefPivots for query {}", query);
        return StreamSupport
            .stream(defPivotSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    /*
    public List<String> getFieldSet(String sql) {
        PivotDataDTO data = getSqlData("select * from ("+sql+") where 1=2");
        return data.getFieldList();
    }
    */

    @Override
    public PivotDataDTO getSqlData(String sql) {
        Statement statement = null;
        ResultSet resultSet = null;
        List<String> columnList = new ArrayList<>();
        List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
        try {
            Session sess = em.unwrap(Session.class);
            statement = sess.doReturningWork(new ReturningWork<Statement>() {
                @Override
                public Statement execute(Connection con) throws SQLException {
                    return con.createStatement();
                }
            });
            resultSet = statement.executeQuery(sql);
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            for (int columnIndex = 1; columnIndex <= columnCount; ++columnIndex) {
                String columnName = metaData.getColumnLabel(columnIndex);
                columnList.add(columnName);
            }
            while (resultSet.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (String columnName : columnList) {
                    Object obj = resultSet.getObject(columnName);
                    row.put(columnName, obj);
                }
                listMap.add(row);
            }
            return new PivotDataDTO(listMap, columnList);
        } catch (Exception e) {
            System.out.println("PivotSQL:"+sql);
            //logger.error(e,e);
            return new PivotDataDTO(listMap, columnList);
        } finally {
            try {
                resultSet.close();
            } catch (Exception e) {
                //logger.error(e,e);
            }
            try {
                statement.close();
            } catch (Exception e) {
                //logger.error(e,e);
            }
        }
    }

}
