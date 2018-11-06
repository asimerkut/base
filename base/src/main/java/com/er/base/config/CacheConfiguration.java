package com.er.base.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.er.base.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.er.base.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.er.base.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.er.base.domain.DefPivot.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.FiscalYear.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.DefType.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.DefItem.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.DefRelation.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.DefAnswer.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerCompany.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerPerson.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.FiscalPeriod.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerPlan.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerExcuse.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerSubmit.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerDaily.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerPeriodState.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.FiscalDayoff.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerPerson.class.getName() + ".valLists", jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerValue.class.getName(), jcacheConfiguration);
            cm.createCache(com.er.base.domain.PerPerson.class.getName() + ".dailyLists", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
