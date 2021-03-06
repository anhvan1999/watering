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

    private final JwtAuthenticationProvider jwtProvider;

    private final JwtService jwtService;

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
        http
                .csrf() // disable csrf
                .disable()
                .cors() // allow crossite request
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/info/adduser",
                        "/info",
                        "/stomp/**",
                        "/ws/websocket/**",
                        "/auth/**",
                        "/h2-console/**",
                        "/motor/list",
                        "/sensordetail/list"
                )
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .addFilter(getJwtFilter())
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers()
                .frameOptions()
                .disable();
    }

    public JwtAuthenticationFilter getJwtFilter() throws Exception {
        return new JwtAuthenticationFilter(authenticationManager(), jwtService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
