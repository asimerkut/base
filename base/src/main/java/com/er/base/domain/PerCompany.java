package com.er.base.domain;

import com.er.fin.domain.IEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PerCompany.
 */
@Entity
@Table(name = "per_company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "percompany")
public class PerCompany implements IEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "code", length = 20, nullable = false)
    private String code;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DefItem sehir;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DefItem tipi;

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

    public PerCompany code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public PerCompany name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DefItem getSehir() {
        return sehir;
    }

    public PerCompany sehir(DefItem defItem) {
        this.sehir = defItem;
        return this;
    }

    public void setSehir(DefItem defItem) {
        this.sehir = defItem;
    }

    public DefItem getTipi() {
        return tipi;
    }

    public PerCompany tipi(DefItem defItem) {
        this.tipi = defItem;
        return this;
    }

    public void setTipi(DefItem defItem) {
        this.tipi = defItem;
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
        PerCompany perCompany = (PerCompany) o;
        if (perCompany.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perCompany.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerCompany{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }

    @Override
    public String getLabel() {
        return code+":"+name;
    }
}
