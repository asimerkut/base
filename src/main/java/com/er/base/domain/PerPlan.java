package com.er.base.domain;

import com.er.base.domain.enumeration.EnmType;
import com.er.fin.domain.CheckDefType;
import com.er.fin.domain.IEntity;
import com.er.fin.dto.PerScheduleDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Objects;

import com.er.base.domain.enumeration.EnmDersGrup;

/**
 * A PerPlan.
 */
@Entity
@Table(name = "per_plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perplan")
public class PerPlan implements IEntity, PerScheduleDTO {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "day_no", nullable = false)
    private DayOfWeek dayNo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "ders_grup", nullable = false)
    private EnmDersGrup dersGrup;

    @NotNull
    @Max(value = 15)
    @Column(name = "ders_sira", nullable = false)
    private Integer dersSira;

    @NotNull
    @Max(value = 15)
    @Column(name = "ders_adet", nullable = false)
    private Integer dersAdet;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private PerPerson person;

    @ManyToOne(optional = false)
    //@NotNull
    @JsonIgnoreProperties("")
    @CheckDefType(EnmType.DERS)
    private DefItem ders;

    @Transient
    private Long cellId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public PerPlan startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public DayOfWeek getDayNo() {
        return dayNo;
    }

    public PerPlan dayNo(DayOfWeek dayNo) {
        this.dayNo = dayNo;
        return this;
    }

    public EnmDersGrup getDersGrup() {
        return dersGrup;
    }

    public PerPlan dersGrup(EnmDersGrup dersGrup) {
        this.dersGrup = dersGrup;
        return this;
    }

    public void setDersGrup(EnmDersGrup dersGrup) {
        this.dersGrup = dersGrup;
    }

    public Integer getDersSira() {
        return dersSira;
    }

    public PerPlan dersSira(Integer dersSira) {
        this.dersSira = dersSira;
        return this;
    }

    public void setDersSira(Integer dersSira) {
        this.dersSira = dersSira;
    }

    public Integer getDersAdet() {
        return dersAdet;
    }

    public PerPlan dersAdet(Integer dersAdet) {
        this.dersAdet = dersAdet;
        return this;
    }

    public void setDersAdet(Integer dersAdet) {
        this.dersAdet = dersAdet;
    }

    public PerPerson getPerson() {
        return person;
    }

    public PerPlan person(PerPerson perPerson) {
        this.person = perPerson;
        return this;
    }

    public void setPerson(PerPerson perPerson) {
        this.person = perPerson;
    }

    public DefItem getDers() {
        return ders;
    }

    public PerPlan ders(DefItem defItem) {
        this.ders = defItem;
        return this;
    }

    public void setDers(DefItem defItem) {
        this.ders = defItem;
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
        PerPlan perPlan = (PerPlan) o;
        if (perPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerPlan{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", dayNo='" + getDayNo() + "'" +
            ", dersGrup='" + getDersGrup() + "'" +
            ", dersSira=" + getDersSira() +
            ", dersAdet=" + getDersAdet() +
            "}";
    }

    @Override
    public String getLabel() {
        return this.ders.getName()+(this.getDersSira()==0 || this.dersAdet.intValue()>1?" ("+this.dersAdet+")":"");
    }

    public Long getCellId() {
        return cellId;
    }

    public void setCellId(Long cellId) {
        this.cellId = cellId;
    }


    public void setDayNo(DayOfWeek dayNo) {
        this.dayNo = dayNo;
    }


    @Override
    public PerExcuse getExcuse() {
        return null;
    }

    @Override
    public void setExcuse(PerExcuse excuse) {
    }

}
