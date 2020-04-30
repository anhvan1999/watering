package com.coderteam.watering.secutiry.config;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * @author Dang Anh Van
 */
public class JwtAuthentication implements Authentication {

    // Serial version id
    private static final long serialVersionUID = 3832812659524636794L;

    private String name;

    private List<SimpleGrantedAuthority> authorities;

    public JwtAuthentication(@NonNull DecodedJWT decodedJwt) {
        this.name = decodedJwt.getSubject();
        this.authorities = decodedJwt.getClaim("authorities").asList(String.class).stream()
                .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        throw new UnsupportedOperationException();
    }

}
