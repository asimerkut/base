package com.er.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PerDaily.
 */
@Entity
@Table(name = "per_daily")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perdaily")
public class PerDaily implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Max(value = 15)
    @Column(name = "ders_sira")
    private Integer dersSira;

    @Size(max = 5)
    @Column(name = "hour_start", length = 5)
    private String hourStart;

    @Size(max = 5)
    @Column(name = "hour_finish", length = 5)
    private String hourFinish;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PerCompany okul;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDersSira() {
        return dersSira;
    }

    public PerDaily dersSira(Integer dersSira) {
        this.dersSira = dersSira;
        return this;
    }

    public void setDersSira(Integer dersSira) {
        this.dersSira = dersSira;
    }

    public String getHourStart() {
        return hourStart;
    }

    public PerDaily hourStart(String hourStart) {
        this.hourStart = hourStart;
        return this;
    }

    public void setHourStart(String hourStart) {
        this.hourStart = hourStart;
    }

    public String getHourFinish() {
        return hourFinish;
    }

    public PerDaily hourFinish(String hourFinish) {
        this.hourFinish = hourFinish;
        return this;
    }

    public void setHourFinish(String hourFinish) {
        this.hourFinish = hourFinish;
    }

    public PerCompany getOkul() {
        return okul;
    }

    public PerDaily okul(PerCompany perCompany) {
        this.okul = perCompany;
        return this;
    }

    public void setOkul(PerCompany perCompany) {
        this.okul = perCompany;
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
        PerDaily perDaily = (PerDaily) o;
        if (perDaily.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perDaily.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerDaily{" +
            "id=" + getId() +
            ", dersSira=" + getDersSira() +
            ", hourStart='" + getHourStart() + "'" +
            ", hourFinish='" + getHourFinish() + "'" +
            "}";
    }
}
