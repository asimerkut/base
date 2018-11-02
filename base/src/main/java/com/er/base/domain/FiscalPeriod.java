package com.er.base.domain;

import com.er.base.domain.enumeration.EnmType;
import com.er.fin.domain.CheckDefType;
import com.er.fin.domain.IEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A FiscalPeriod.
 */
@Entity
@Table(name = "fiscal_period")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fiscalperiod")
public class FiscalPeriod implements IEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "month", nullable = false)
    private String month;

    @NotNull
    @Column(name = "week", nullable = false)
    private Long week;

    @NotNull
    @Column(name = "date_start", nullable = false)
    private LocalDate dateStart;

    @NotNull
    @Column(name = "date_finish", nullable = false)
    private LocalDate dateFinish;

    @NotNull
    @Column(name = "jhi_entry", nullable = false)
    private Boolean entry;

    @ManyToOne
    @JsonIgnoreProperties("")
    private FiscalYear fiscalYear;

    @ManyToOne
    @JsonIgnoreProperties("")
    @CheckDefType(EnmType.DONEM)
    private DefItem donem;

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

    public FiscalPeriod code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMonth() {
        return month;
    }

    public FiscalPeriod month(String month) {
        this.month = month;
        return this;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Long getWeek() {
        return week;
    }

    public FiscalPeriod week(Long week) {
        this.week = week;
        return this;
    }

    public void setWeek(Long week) {
        this.week = week;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public FiscalPeriod dateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
        return this;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateFinish() {
        return dateFinish;
    }

    public FiscalPeriod dateFinish(LocalDate dateFinish) {
        this.dateFinish = dateFinish;
        return this;
    }

    public void setDateFinish(LocalDate dateFinish) {
        this.dateFinish = dateFinish;
    }

    public Boolean isEntry() {
        return entry;
    }

    public FiscalPeriod entry(Boolean entry) {
        this.entry = entry;
        return this;
    }

    public void setEntry(Boolean entry) {
        this.entry = entry;
    }

    public FiscalYear getFiscalYear() {
        return fiscalYear;
    }

    public FiscalPeriod fiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
        return this;
    }

    public void setFiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
    }

    public DefItem getDonem() {
        return donem;
    }

    public FiscalPeriod donem(DefItem defItem) {
        this.donem = defItem;
        return this;
    }

    public void setDonem(DefItem defItem) {
        this.donem = defItem;
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
        FiscalPeriod fiscalPeriod = (FiscalPeriod) o;
        if (fiscalPeriod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fiscalPeriod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FiscalPeriod{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", month='" + getMonth() + "'" +
            ", week=" + getWeek() +
            ", dateStart='" + getDateStart() + "'" +
            ", dateFinish='" + getDateFinish() + "'" +
            ", entry='" + isEntry() + "'" +
            "}";
    }

    @Override
    public String getLabel() {
        return id.toString();
    }
}
