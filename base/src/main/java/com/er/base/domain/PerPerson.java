package com.er.base.domain;

import com.er.fin.domain.IEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A PerPerson.
 */
@Entity
@Table(name = "per_person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perperson")
public class PerPerson implements IEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Max(value = 8)
    @Column(name = "shift_1")
    private Integer shift1;

    @Max(value = 8)
    @Column(name = "shift_2")
    private Integer shift2;

    @Max(value = 8)
    @Column(name = "shift_3")
    private Integer shift3;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PerCompany okul;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PerValue> valLists = new HashSet<>();

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PerDaily> dailyLists = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private User loginUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PerPerson name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public PerPerson email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public PerPerson phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getShift1() {
        return shift1;
    }

    public PerPerson shift1(Integer shift1) {
        this.shift1 = shift1;
        return this;
    }

    public void setShift1(Integer shift1) {
        this.shift1 = shift1;
    }

    public Integer getShift2() {
        return shift2;
    }

    public PerPerson shift2(Integer shift2) {
        this.shift2 = shift2;
        return this;
    }

    public void setShift2(Integer shift2) {
        this.shift2 = shift2;
    }

    public Integer getShift3() {
        return shift3;
    }

    public PerPerson shift3(Integer shift3) {
        this.shift3 = shift3;
        return this;
    }

    public void setShift3(Integer shift3) {
        this.shift3 = shift3;
    }

    public Set<PerValue> getValLists() {
        return valLists;
    }

    public PerPerson valLists(Set<PerValue> perValues) {
        this.valLists = perValues;
        return this;
    }

    public PerPerson addValList(PerValue perValue) {
        this.valLists.add(perValue);
        perValue.setPerson(this);
        return this;
    }

    public PerPerson removeValList(PerValue perValue) {
        this.valLists.remove(perValue);
        perValue.setPerson(null);
        return this;
    }

    public void setValLists(Set<PerValue> perValues) {
        this.valLists = perValues;
    }

    public Set<PerDaily> getDailyLists() {
        return dailyLists;
    }

    public PerPerson dailyLists(Set<PerDaily> perDailies) {
        this.dailyLists = perDailies;
        return this;
    }

    public PerPerson addDailyList(PerDaily perDaily) {
        this.dailyLists.add(perDaily);
        perDaily.setPerson(this);
        return this;
    }

    public PerPerson removeDailyList(PerDaily perDaily) {
        this.dailyLists.remove(perDaily);
        perDaily.setPerson(null);
        return this;
    }

    public void setDailyLists(Set<PerDaily> perDailies) {
        this.dailyLists = perDailies;
    }

    public User getLoginUser() {
        return loginUser;
    }

    public PerPerson loginUser(User user) {
        this.loginUser = user;
        return this;
    }

    public void setLoginUser(User user) {
        this.loginUser = user;
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
        PerPerson perPerson = (PerPerson) o;
        if (perPerson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perPerson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerPerson{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", okul=" + getOkul() +
            "}";
    }

    @Override
    public String getLabel() {
        return loginUser.getLogin();
    }

    public PerCompany getOkul() {
        return okul;
    }

    public void setOkul(PerCompany okul) {
        this.okul = okul;
    }
}
