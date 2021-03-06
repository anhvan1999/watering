package com.coderteam.watering.secutiry.controller;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.coderteam.watering.secutiry.service.JwtService;
import com.coderteam.watering.secutiry.util.ErrorResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import lombok.Builder;
import lombok.Data;

/**
 * @author Dang Anh Van
 */
@RestController
@RequestMapping("auth/refresh")
public class RefreshController {

    private final JwtService jwtService;

    public RefreshController(JwtService service) {
        jwtService = service;
    }

    @PostMapping("")
    public TokenResponse getNewToken(@RequestBody RefreshToken refreshToken) {
        DecodedJWT decodedJwt = jwtService.verifyToken(refreshToken.getRefreshToken());

        Instant issueDate = Instant.now();

        List<SimpleGrantedAuthority> authorities = decodedJwt
                .getClaim("authorities")
                .asList(String.class)
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        String newToken = jwtService.generateToken(
                decodedJwt.getSubject(),
                decodedJwt.getClaim("userId").asLong(),
                authorities,
                JwtService.JwtType.TOKEN,
                issueDate
        );

        return TokenResponse.builder()
                .newToken(newToken)
                .issueDate(issueDate)
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleJwtError() {
        return new ErrorResponse("Refresh token not valid", "refresh_not_valid");
    }

}

@Data
class RefreshToken {
    private String refreshToken;
}

@Data
@Builder
class TokenResponse {
    private String newToken;
    private Instant issueDate;
}
