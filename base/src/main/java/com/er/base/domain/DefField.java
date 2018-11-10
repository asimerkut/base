package com.er.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.er.base.domain.enumeration.EnmSelect;

import com.er.base.domain.enumeration.EnmType;

/**
 * A DefField.
 */
@Entity
@Table(name = "def_field")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "deffield")
public class DefField implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 20)
    @Column(name = "table_name", length = 20)
    private String tableName;

    @NotNull
    @Column(name = "order_no", nullable = false)
    private Integer orderNo;

    @NotNull
    @Size(max = 20)
    @Column(name = "group_name", length = 20, nullable = false)
    private String groupName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sel_select", nullable = false)
    private EnmSelect selSelect;

    @Enumerated(EnumType.STRING)
    @Column(name = "sel_type")
    private EnmType selType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public DefField tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public DefField orderNo(Integer orderNo) {
        this.orderNo = orderNo;
        return this;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public String getGroupName() {
        return groupName;
    }

    public DefField groupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public EnmSelect getSelSelect() {
        return selSelect;
    }

    public DefField selSelect(EnmSelect selSelect) {
        this.selSelect = selSelect;
        return this;
    }

    public void setSelSelect(EnmSelect selSelect) {
        this.selSelect = selSelect;
    }

    public EnmType getSelType() {
        return selType;
    }

    public DefField selType(EnmType selType) {
        this.selType = selType;
        return this;
    }

    public void setSelType(EnmType selType) {
        this.selType = selType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DefField defField = (DefField) o;
        if (defField.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), defField.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DefField{" +
            "id=" + getId() +
            ", tableName='" + getTableName() + "'" +
            ", orderNo=" + getOrderNo() +
            ", groupName='" + getGroupName() + "'" +
            ", selSelect='" + getSelSelect() + "'" +
            ", selType='" + getSelType() + "'" +
            "}";
    }
}
