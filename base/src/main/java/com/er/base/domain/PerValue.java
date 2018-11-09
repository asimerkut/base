package com.er.base.domain;

import com.er.fin.domain.IEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.util.Objects;

/**
 * A PerValue.
 */
@Entity
@Table(name = "per_value")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "pervalue")
public class PerValue implements IEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne(optional = false)
    private DefType valType;

    @ManyToOne
    private DefItem valItem;

    @ManyToOne
    @JsonIgnore
    private PerPerson person;

    @Transient
    private String grp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DefType getValType() {
        return valType;
    }

    public PerValue valType(DefType defType) {
        this.valType = defType;
        return this;
    }

    public void setValType(DefType defType) {
        this.valType = defType;
    }

    public DefItem getValItem() {
        return valItem;
    }

    public PerValue valItem(DefItem defItem) {
        this.valItem = defItem;
        return this;
    }

    public void setValItem(DefItem defItem) {
        this.valItem = defItem;
    }

    public PerPerson getPerson() {
        return person;
    }

    public PerValue person(PerPerson perPerson) {
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
        PerValue perValue = (PerValue) o;
        if (perValue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perValue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerValue{" +
            "id=" + getId() +
            "}";
    }

    @Override
    public String getLabel() {
        return (this.grp);
    }

    public String getGrp() {
        return grp;
    }

    public void setGrp(String grp) {
        this.grp = grp;
    }
}
