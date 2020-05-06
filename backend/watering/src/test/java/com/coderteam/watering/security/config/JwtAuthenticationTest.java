package com.coderteam.watering.security.config;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.service.JwtService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.Instant;
import java.util.List;

public class JwtAuthenticationTest extends BaseTestSuite {

    @Autowired
    JwtService jwtService;

    private JwtAuthentication authentication;

    @Test
    public void testValidToken() {
        String token = jwtService.generateToken(
                "anhvan",
                1713913L,
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                JwtService.JwtType.TOKEN,
                Instant.now()
        );

        authentication = new JwtAuthentication(jwtService.verifyToken(token));

        Assertions.assertNull(authentication.getCredentials());

        Assertions.assertNull(authentication.getDetails());

        Assertions.assertNull(authentication.getPrincipal());

        Assertions.assertThrows(
                UnsupportedOperationException.class,
                () -> authentication.setAuthenticated(true)
        );

        Assertions.assertEquals("anhvan", authentication.getName());

        Assertions.assertEquals(1713913, authentication.getUserId());

        Assertions.assertArrayEquals(
                authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toArray(),
                new String[]{"ROLE_USER"}
        );
    }

}
