package com.er.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.er.base.domain.enumeration.EnmPeriodState;

/**
 * A PerPeriodState.
 */
@Entity
@Table(name = "per_period_state")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perperiodstate")
public class PerPeriodState implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "period_state", nullable = false)
    private EnmPeriodState periodState;

    @ManyToOne
    @JsonIgnoreProperties("")
    private FiscalPeriod fiscalPeriod;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PerPerson person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EnmPeriodState getPeriodState() {
        return periodState;
    }

    public PerPeriodState periodState(EnmPeriodState periodState) {
        this.periodState = periodState;
        return this;
    }

    public void setPeriodState(EnmPeriodState periodState) {
        this.periodState = periodState;
    }

    public FiscalPeriod getFiscalPeriod() {
        return fiscalPeriod;
    }

    public PerPeriodState fiscalPeriod(FiscalPeriod fiscalPeriod) {
        this.fiscalPeriod = fiscalPeriod;
        return this;
    }

    public void setFiscalPeriod(FiscalPeriod fiscalPeriod) {
        this.fiscalPeriod = fiscalPeriod;
    }

    public PerPerson getPerson() {
        return person;
    }

    public PerPeriodState person(PerPerson perPerson) {
        this.person = perPerson;
        return this;
    }

    public void setPerson(PerPerson perPerson) {
        this.person = perPerson;
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
        PerPeriodState perPeriodState = (PerPeriodState) o;
        if (perPeriodState.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perPeriodState.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerPeriodState{" +
            "id=" + getId() +
            ", periodState='" + getPeriodState() + "'" +
            "}";
    }

    public  String getCode(){
        return id.toString();
    }

}
