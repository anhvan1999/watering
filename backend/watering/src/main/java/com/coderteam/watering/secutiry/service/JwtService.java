package com.coderteam.watering.secutiry.service;

import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public static enum JwtType {
        TOKEN, REFRESH_TOKEN
    }

    // Algorithm
    private Algorithm algo;

    @Value("${jwt.timeout}")
    private long jwtTimeout;

    @Value("${jwt.refresh-timeout}")
    private long jwtRefreshTimeout;

    public JwtService(@Value("${jwt.token}") String privateKey) {
        algo = Algorithm.HMAC512(privateKey);
    }

    public String generateToken(String username, List<GrantedAuthority> authorities, JwtType type, Date issueDate) {
        // Get timeout interval
        long timeOutInterval = jwtTimeout;
        if (type == JwtType.REFRESH_TOKEN) {
            timeOutInterval = jwtRefreshTimeout;
        }

        // Generate token
        String token = JWT
                .create()
                .withSubject(username)
                .withArrayClaim("authorities", authorities.stream().map(x -> x.getAuthority()).toArray(String[]::new))
                .withIssuedAt(issueDate)
                .withExpiresAt(new Date(issueDate.getTime() + timeOutInterval * 1000))
                .sign(algo);

        // Return the new token
        return token;
    }

    public DecodedJWT verifyToken(String token) {
        return JWT.require(algo)
            .build()
            .verify(token);
    }

}
