/**
 * @author Dang Anh Van
 */

package com.coderteam.watering.secutiry.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.coderteam.watering.secutiry.service.JwtService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtAuthenticationFilter extends GenericFilterBean {

    private JwtService jwtService;

    private AuthenticationManager manager;

    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(AuthenticationManager manager, JwtService jwtService) {
        this.manager = manager;
        this.jwtService = jwtService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // Convert request to HttpServletRequest
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Get jwtToken from header
        String authorizationHeader = httpRequest.getHeader("Authorization");
        if (authorizationHeader == null || authorizationHeader.length() <= 4) {
            chain.doFilter(request, response);
            return;
        }
        String jwtToken = authorizationHeader.substring(4);

        // Try to authenticate jwt token
        try {
            Authentication auth = manager.authenticate(new JwtAuthentication(jwtService.verifyToken(jwtToken)));
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(auth);
            SecurityContextHolder.setContext(context);
        } catch (Exception e) {
            logger.info("Authenticate failed");
        }

        // Call other filter in filter chain
        chain.doFilter(request, response);
    }

}
