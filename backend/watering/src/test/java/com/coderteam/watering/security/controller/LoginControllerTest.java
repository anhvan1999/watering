package com.coderteam.watering.security.controller;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import lombok.Data;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@AutoConfigureMockMvc
@Transactional
public class LoginControllerTest extends BaseTestSuite {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private PasswordEncoder encoder;

    @Test
    public void testLoginSuccess() throws Exception {
        User user = User.builder()
                .username("testuser")
                .password(encoder.encode("1234"))
                .authorities("ROLE_USER")
                .fullName("TEST USER")
                .build();
        userRepos.save(user);

        String credentials = new ObjectMapper().writeValueAsString(
                TestLoginCredentials.builder()
                        .username("testuser")
                        .password("1234")
                        .build()
        );

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    public void testUsernameNotValid() throws Exception {
        String credentials = new ObjectMapper().writeValueAsString(
                TestLoginCredentials.builder()
                        .username("testuse")
                        .password("1234")
                        .build()
        );

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void testPasswordNotValid() throws Exception {
        String credentials = new ObjectMapper().writeValueAsString(
                TestLoginCredentials.builder()
                        .username("testuser")
                        .password("1264")
                        .build()
        );

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(credentials))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

}

@Data
@Builder
class TestLoginCredentials {
    private String username;
    private String password;
}