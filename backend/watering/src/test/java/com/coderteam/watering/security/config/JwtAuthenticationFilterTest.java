package com.coderteam.watering.security.config;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.config.JwtAuthenticationFilter;
import com.coderteam.watering.secutiry.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class JwtAuthenticationFilterTest extends BaseTestSuite {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    private JwtAuthenticationFilter jwtAuthFilter;

    private HttpServletRequest request;

    private HttpServletResponse response;

    private FilterChain filterChain;

    private JwtService service;

    private AuthenticationManager manager;

    @BeforeEach
    public void setUp() {
        // Create mock object
        manager = mock(AuthenticationManager.class);
        service = mock(JwtService.class);

        // Request, response and filter chain
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        filterChain = mock(FilterChain.class);

        // Create test object
        jwtAuthFilter = new JwtAuthenticationFilter(manager, service);
    }

    @Test
    protected void testIfJwtServiceWasCalled() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("jwt 1234");
        jwtAuthFilter.doFilter(request, response, filterChain);
        verify(service).verifyToken("1234");
    }

    @Test
    protected void testIfJwtServiceWasnotCalled() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("jwt ");
        jwtAuthFilter.doFilter(request, response, filterChain);
        verify(service, never()).verifyToken("1234");
    }

    @Test
    protected void testIfAuthManagerWasSuccess() throws Exception {
        // Create mock object
        DecodedJWT decodedJwt = mock(DecodedJWT.class);
        Claim authoritiesClaim = mock(Claim.class);
        Claim userIdClaim = mock(Claim.class);

        // Set mock method result
        when(request.getHeader("Authorization")).thenReturn("jwt 1234");
        when(service.verifyToken("1234")).thenReturn(decodedJwt);
        when(decodedJwt.getSubject()).thenReturn("anhvan");
        when(decodedJwt.getClaim("authorities")).thenReturn(authoritiesClaim);
        when(authoritiesClaim.asList(String.class)).thenReturn(List.of("ROLE_USER"));
        when(userIdClaim.asLong()).thenReturn(1713913L);
        when(decodedJwt.getClaim("userId")).thenReturn(userIdClaim);

        // Do filter
        jwtAuthFilter.doFilter(request, response, filterChain);

        // Test
        verify(service).verifyToken("1234");
        verify(manager).authenticate(any(JwtAuthentication.class));
    }

    @Test
    public void testInfoController() throws Exception {
        mockMvc.perform(get("/info"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello world"));
    }

    @Test
    public void testUnauthorizedUser() throws Exception {
        mockMvc.perform(get("/info/user"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testAuthorizedUser() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String token = jwtService.generateToken(
                "danganhvan",
                1713913L,
                authorityList,
                JwtService.JwtType.TOKEN,
                new Date()
        );
        mockMvc.perform(get("/info/user")
                .header("Authorization", "jwt " + token))
                .andExpect(status().isOk())
                .andExpect(content().string("danganhvan"));
    }

    @Test
    public void testAuthenticationFailed() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String token = jwtService.generateToken(
                "danganhvan",
                1713913L,
                authorityList,
                JwtService.JwtType.TOKEN,
                new Date()
        );
        mockMvc.perform(get("/info/user")
                .header("Authorization", "jwt d" + token))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testForbbiden() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        String token = jwtService.generateToken(
                "danganhvan",
                1713913L,
                authorityList,
                JwtService.JwtType.TOKEN,
                new Date()
        );
        mockMvc.perform(get("/info/user")
                .header("Authorization", "jwt " + token))
                .andExpect(status().isForbidden());
    }

}
