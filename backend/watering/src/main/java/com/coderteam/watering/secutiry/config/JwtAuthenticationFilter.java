/**
 * @author Dang Anh Van
 */

package com.coderteam.watering.secutiry.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.coderteam.watering.secutiry.service.JwtService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private JwtService jwtService;

    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(AuthenticationManager manager, JwtService jwtService) {
        super(manager);
        this.jwtService = jwtService;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // Get jwtToken from header
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || authorizationHeader.length() <= 4
                || !authorizationHeader.substring(0, 3).equals("jwt")) {
            chain.doFilter(request, response);
            return;
        }
        String jwtToken = authorizationHeader.substring(4);

        // Try to authenticate jwt token
        try {
            AuthenticationManager manager = getAuthenticationManager();
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
