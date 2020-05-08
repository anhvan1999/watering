package com.coderteam.watering.secutiry.config;

import com.coderteam.watering.secutiry.service.JwtService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author Dang Anh Van
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtAuthenticationProvider jwtProvider;

    private JwtService jwtService;

    public SecurityConfig(JwtAuthenticationProvider jwtProvider, JwtService jwtService) {
        this.jwtProvider = jwtProvider;
        this.jwtService = jwtService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(jwtProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/info/adduser", "/info", "/stomp/**", "/ws/websocket/**", "/login").permitAll()
                .antMatchers("/info/user").hasAnyRole("USER")
                .anyRequest().authenticated()
                .and()
                .addFilter(getJwtFilter()).sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    public JwtAuthenticationFilter getJwtFilter() throws Exception {
        return new JwtAuthenticationFilter(authenticationManager(), jwtService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
