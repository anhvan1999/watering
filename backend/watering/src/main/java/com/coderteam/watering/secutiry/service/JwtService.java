package com.coderteam.watering.secutiry.service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    /**
     * JwtType enum: TOKEN & REFRESH_TOKEN
     */
    public enum JwtType {
        TOKEN, REFRESH_TOKEN
    }

    // Algorithm
    private Algorithm algo;

    // Jwt timeout interval
    private long jwtTimeout;

    // Jwt refresh token timeout interval
    private long jwtRefreshTimeout;

    public JwtService(@Value("${jwt.token}") String privateKey, @Value("${jwt.timeout}") long jwtTimeout,
                      @Value("${jwt.refresh-timeout}") long jwtRefreshTimeout) {
        algo = Algorithm.HMAC512(privateKey);
        // Get timeout & refreshTimeout from application configuration file
        this.jwtTimeout = jwtTimeout;
        this.jwtRefreshTimeout = jwtRefreshTimeout;
    }

    /**
     * 
     * @param username username must not null
     * @param authorities autorities list must not null
     * @param type TOKEN | REFRESH_TOKEN must not null
     * @param issueDate token creation time must not null
     * @return jwt token have subject: username, authorities: list of user authorities, issueAt: issueDate,
     * expireAt: issueDate + timeoutInterval
     */
    public String generateToken(@NonNull String username, @NonNull List<GrantedAuthority> authorities,
                                @NonNull JwtType type, @NonNull Date issueDate) {
        // Convert date to instant (New Java Datetime API)
        return generateToken(username, authorities, type, issueDate.toInstant());
    }

    /**
     * 
     * @param username username must not null
     * @param authorities autorities list must not null
     * @param type TOKEN | REFRESH_TOKEN must not null
     * @param issueInstant token creation time must not null
     * @return jwt token have subject: username, authorities: list of user authorities, issueAt: issueInstant,
     * expireAt: issueInstant + timeoutInterval
     */
    public String generateToken(@NonNull String username, @NonNull List<GrantedAuthority> authorities,
                                @NonNull JwtType type, @NonNull Instant issueInstant) {
        // Get timeout interval
        long timeOutInterval = jwtTimeout;
        if (type == JwtType.REFRESH_TOKEN) {
            timeOutInterval = jwtRefreshTimeout;
        }

        // Issue and expire date
        Date issueDate = Date.from(issueInstant);
        Date expireDate = Date.from(issueInstant.plusSeconds(timeOutInterval));

        // Authorities
        String[] authorityArr = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);

        // Generate and return token
        return JWT.create()
                .withSubject(username)
                .withArrayClaim("authorities", authorityArr)
                .withIssuedAt(issueDate)
                .withExpiresAt(expireDate)
                .sign(algo);
    }

    /**
     * 
     * @param token
     * @return DecodedJWT
     */
    public DecodedJWT verifyToken(@NonNull String token) {
        return JWT.require(algo)
                .build()
                .verify(token);
    }

}
