package com.coderteam.watering.security.config;

import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.service.JwtService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.TestPropertySource;

import java.time.Instant;
import java.util.List;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class JwtAuthenticationTest {

    @Autowired
    JwtService jwtService;

    private JwtAuthentication authentication;

    @Test
    public void testValidToken() {
        String token = jwtService.generateToken(
                "anhvan",
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
