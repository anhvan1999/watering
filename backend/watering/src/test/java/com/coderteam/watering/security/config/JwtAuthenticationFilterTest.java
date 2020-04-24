package com.coderteam.watering.security.config;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;
import java.util.List;

import com.coderteam.watering.secutiry.service.JwtService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class JwtAuthenticationFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Test
    public void testInfoController() throws Exception {
        mockMvc.perform(get("/info")).andExpect(status().isOk()).andExpect(content().string("Hello world"));
    }

    @Test
    public void testUnauthorizedUser() throws Exception {
        mockMvc.perform(get("/info/user")).andExpect(status().is4xxClientError());
    }

    @Test
    public void testAuthorizedUser() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String token = jwtService.generateToken("danganhvan", authorityList, JwtService.JwtType.TOKEN, new Date());
        mockMvc.perform(get("/info/user").header("Authorization", "jwt " + token)).andDo(print())
                .andExpect(status().isOk()).andExpect(content().string("danganhvan"));
    }

    @Test
    public void testAuthenticationFailed() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String token = jwtService.generateToken("danganhvan", authorityList, JwtService.JwtType.TOKEN, new Date());
        mockMvc.perform(get("/info/user").header("Authorization", "jwt d" + token)).andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testForbbiden() throws Exception {
        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        String token = jwtService.generateToken("danganhvan", authorityList, JwtService.JwtType.TOKEN, new Date());
        mockMvc.perform(get("/info/user").header("Authorization", "jwt " + token)).andDo(print())
                .andExpect(status().isForbidden());
    }

}
