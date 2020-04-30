package com.coderteam.watering.security.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.coderteam.watering.secutiry.service.JwtService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@SpringBootTest
public class JwtServiceTest {

    @Autowired
    private JwtService jwtService;

    private Calendar calendar;

    private String jwtString;

    @BeforeEach
    public void setUp() {
        calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        GrantedAuthority role = new SimpleGrantedAuthority("ROLE_USER");
        jwtString = jwtService.generateToken("anhvan", List.of(role), JwtService.JwtType.TOKEN, calendar.getTime());
    }

    @Test
    public void testUsername() {
        DecodedJWT decodedJwt = jwtService.verifyToken(jwtString);
        assertEquals("anhvan", decodedJwt.getSubject());
    }

    @Test
    public void testAuthority() {
        DecodedJWT decodedJwt = jwtService.verifyToken(jwtString);
        assertEquals("ROLE_USER", decodedJwt.getClaim("authorities").asArray(String.class)[0]);
    }

    @Test
    public void testExpiredDate() {
        DecodedJWT decodedJwt = jwtService.verifyToken(jwtString);
        Date expiredDate = decodedJwt.getExpiresAt();
        assertEquals(calendar.getTimeInMillis() / 1000 + 3600, expiredDate.getTime() / 1000);
    }

    @Test
    public void testIssueDate() {
        DecodedJWT decodedJwt = jwtService.verifyToken(jwtString);
        Date issueDate = decodedJwt.getIssuedAt();
        assertEquals(calendar.getTimeInMillis() / 1000, issueDate.getTime() / 1000);
    }

    @Test
    public void testInvalidToken() {
        String token = jwtString.substring(2);
        assertThrows(IllegalArgumentException.class, () -> jwtService.verifyToken(token));
    }

    @Test
    public void testInvalidSignedToken() {
        String token = jwtString.substring(0, jwtString.length() - 2) + "Az";
        assertThrows(SignatureVerificationException.class, () -> jwtService.verifyToken(token));
    }

    @Test
    public void testExpiredToken() {
        String token = jwtService.generateToken("anhvan", new ArrayList<>(), JwtService.JwtType.TOKEN,
                new Date(calendar.getTimeInMillis() - 10000 * 1000));
        assertThrows(JWTVerificationException.class, () -> jwtService.verifyToken(token));
    }

    @Test
    public void testNullableFields() {
        assertThrows(NullPointerException.class, () -> jwtService.generateToken(null, new ArrayList<>(), JwtService.JwtType.TOKEN,
                Instant.now()));
        assertThrows(NullPointerException.class, () -> jwtService.generateToken("anhvan", null, JwtService.JwtType.TOKEN,
                Instant.now()));
        assertThrows(NullPointerException.class, () -> jwtService.generateToken("anhvan", new ArrayList<>(), null,
                Instant.now()));
        assertThrows(NullPointerException.class, () -> jwtService.generateToken("anhvan", new ArrayList<>(), JwtService.JwtType.REFRESH_TOKEN,
                (Instant) null));
    }
}
