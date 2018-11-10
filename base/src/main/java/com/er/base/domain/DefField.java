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

    public static final String TAB_NAME = "PER_VALUE";

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 20)
    @Column(name = "tab_name", length = 20)
    private String tabName;

    @NotNull
    @Column(name = "ord_no", nullable = false)
    private Integer ordNo;

    @NotNull
    @Size(max = 20)
    @Column(name = "grp_name", length = 20, nullable = false)
    private String grpName;

    @NotNull
    @Size(max = 20)
    @Column(name = "fld_caption", length = 20, nullable = false)
    private String fldCaption;

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

    public String getTabName() {
        return tabName;
    }

    public DefField tabName(String tabName) {
        this.tabName = tabName;
        return this;
    }

    public void setTabName(String tabName) {
        this.tabName = tabName;
    }

    public Integer getOrdNo() {
        return ordNo;
    }

    public DefField ordNo(Integer ordNo) {
        this.ordNo = ordNo;
        return this;
    }

    public void setOrdNo(Integer ordNo) {
        this.ordNo = ordNo;
    }

    public String getGrpName() {
        return grpName;
    }

    public DefField grpName(String grpName) {
        this.grpName = grpName;
        return this;
    }

    public void setGrpName(String grpName) {
        this.grpName = grpName;
    }

    public String getFldCaption() {
        return fldCaption;
    }

    public DefField fldCaption(String fldCaption) {
        this.fldCaption = fldCaption;
        return this;
    }

    public void setFldCaption(String fldCaption) {
        this.fldCaption = fldCaption;
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
            ", tabName='" + getTabName() + "'" +
            ", ordNo=" + getOrdNo() +
            ", grpName='" + getGrpName() + "'" +
            ", fldCaption='" + getFldCaption() + "'" +
            ", selSelect='" + getSelSelect() + "'" +
            ", selType='" + getSelType() + "'" +
            "}";
    }
}
