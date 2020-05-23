package com.coderteam.watering.secutiry.service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.NonNull;
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
    private final Algorithm algo;

    // Jwt timeout interval
    private final long jwtTimeout;

    // Jwt refresh token timeout interval
    private final long jwtRefreshTimeout;

    public JwtService(JwtProperties jwtProperties) {
        algo = Algorithm.HMAC512(jwtProperties.getToken());
        // Get timeout & refreshTimeout from application configuration file
        this.jwtTimeout = jwtProperties.getTimeout();
        this.jwtRefreshTimeout = jwtProperties.getRefreshTimeout();
    }

    /**
     * 
     * @param username username must not null
     * @param userId userId must not null
     * @param authorities autorities list must not null
     * @param type TOKEN | REFRESH_TOKEN must not null
     * @param issueDate token creation time must not null
     * @return jwt token have subject: username, authorities: list of user authorities, issueAt: issueDate,
     * expireAt: issueDate + timeoutInterval
     */
    public String generateToken(@NonNull String username, @NonNull Long userId, @NonNull List<GrantedAuthority> authorities,
                                @NonNull JwtType type, @NonNull Date issueDate) {
        // Convert date to instant (New Java Datetime API)
        return generateToken(username, userId, authorities, type, issueDate.toInstant());
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
    public String generateToken(@NonNull String username, @NonNull Long userId, @NonNull List<? extends GrantedAuthority> authorities,
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
                .withClaim("userId", userId)
                .withArrayClaim("authorities", authorityArr)
                .withIssuedAt(issueDate)
                .withExpiresAt(expireDate)
                .sign(algo);
    }

    /**
     * 
     * @param token jwt token
     * @return DecodedJWT if token is valid
     */
    public DecodedJWT verifyToken(@NonNull String token) {
        return JWT.require(algo)
                .build()
                .verify(token);
    }

}
