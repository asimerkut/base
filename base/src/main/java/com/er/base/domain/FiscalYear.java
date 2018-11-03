package com.er.base.domain;

import com.er.fin.domain.IEntity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A FiscalYear.
 */
@Entity
@Table(name = "fiscal_year")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fiscalyear")
public class FiscalYear implements IEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "code", length = 100, nullable = false)
    private String code;

    @NotNull
    @Column(name = "date_start")
    private LocalDate dateStart;

    @NotNull
    @Column(name = "date_finish")
    private LocalDate dateFinish;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public FiscalYear code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public FiscalYear dateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
        return this;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateFinish() {
        return dateFinish;
    }

    public FiscalYear dateFinish(LocalDate dateFinish) {
        this.dateFinish = dateFinish;
        return this;
    }

    public void setDateFinish(LocalDate dateFinish) {
        this.dateFinish = dateFinish;
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
        FiscalYear fiscalYear = (FiscalYear) o;
        if (fiscalYear.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fiscalYear.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FiscalYear{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", dateStart='" + getDateStart() + "'" +
            ", dateFinish='" + getDateFinish() + "'" +
            "}";
    }

    @Override
    public String getLabel() {
        return id.toString();
    }
}
