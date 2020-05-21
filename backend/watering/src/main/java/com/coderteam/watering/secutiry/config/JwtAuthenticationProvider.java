package com.coderteam.watering.secutiry.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * @author Dang Anh Van
 */
@Service
public class JwtAuthenticationProvider implements AuthenticationProvider {

    /**
     * @param authentication contains credentials
     * @return authentication object
     */
    @Override
    public Authentication authenticate(Authentication authentication) {
        return authentication;
    }

    /**
     * @param authentication authentication object
     * @return boolean value represent the support for authentication object
     */
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthentication.class);
    }

}
