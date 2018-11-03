package com.er.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.er.base.domain.enumeration.EnmDayOff;

/**
 * A FiscalDayoff.
 */
@Entity
@Table(name = "fiscal_dayoff")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fiscaldayoff")
public class FiscalDayoff implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "date_start", nullable = false)
    private LocalDate dateStart;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "dayoff_type", nullable = false)
    private EnmDayOff dayoffType;

    @ManyToOne
    @JsonIgnoreProperties("")
    private FiscalYear fiscalYear;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DefItem tatil;

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

    public FiscalDayoff code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public FiscalDayoff dateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
        return this;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public EnmDayOff getDayoffType() {
        return dayoffType;
    }

    public FiscalDayoff dayoffType(EnmDayOff dayoffType) {
        this.dayoffType = dayoffType;
        return this;
    }

    public void setDayoffType(EnmDayOff dayoffType) {
        this.dayoffType = dayoffType;
    }

    public FiscalYear getFiscalYear() {
        return fiscalYear;
    }

    public FiscalDayoff fiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
        return this;
    }

    public void setFiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
    }

    public DefItem getTatil() {
        return tatil;
    }

    public FiscalDayoff tatil(DefItem defItem) {
        this.tatil = defItem;
        return this;
    }

    public void setTatil(DefItem defItem) {
        this.tatil = defItem;
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
        FiscalDayoff fiscalDayoff = (FiscalDayoff) o;
        if (fiscalDayoff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fiscalDayoff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FiscalDayoff{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", dateStart='" + getDateStart() + "'" +
            ", dayoffType='" + getDayoffType() + "'" +
            "}";
    }
}
