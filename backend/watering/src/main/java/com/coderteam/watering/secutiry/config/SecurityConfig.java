/**
 * @author Dang Anh Van
 */

package com.coderteam.watering.secutiry.config;

import com.coderteam.watering.secutiry.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    JwtAuthenticationProvider jwtProvider;

    @Autowired
    JwtService jwtService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(jwtProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers("/info").permitAll().antMatchers("/info/user")
                .hasAnyRole("USER").anyRequest().authenticated().and()
                .addFilterBefore(getJwtFilter(), UsernamePasswordAuthenticationFilter.class).sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    public JwtAuthenticationFilter getJwtFilter() throws Exception {
        return new JwtAuthenticationFilter(authenticationManager(), jwtService);
    }

}
