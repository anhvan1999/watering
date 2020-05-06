package com.coderteam.watering.security.entity;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.OffsetDateTime;

public class UserTest extends BaseTestSuite {

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .username("anhvan1999")
                .fullName("Đặng Anh Văn")
                .active(true)
                .password("1234")
                .createdAt(OffsetDateTime.now())
                .authorities("ROLE_USER").build();
    }

    @Test
    void testUserName() {
        Assertions.assertEquals("anhvan1999", user.getUsername());
    }

    @Test
    void testPassword() {
        Assertions.assertEquals("1234", user.getPassword());
    }

    @Test
    void testActive() {
        Assertions.assertEquals(true, user.getActive());
    }

    @Test
    void testAuthorities() {
        var lst = user.getAuthorities();
        Assertions.assertEquals(1, lst.size());
        Assertions.assertEquals("ROLE_USER", lst.get(0).getAuthority());
    }

}
