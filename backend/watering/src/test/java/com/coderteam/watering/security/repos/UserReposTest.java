package com.coderteam.watering.security.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserReposTest extends BaseTestSuite {

    @Autowired
    UserRepos userRepos;

    @Autowired
    PasswordEncoder encoder;

    @Test
    void testSuperUser() {
        var user = userRepos.findByUsername("superuser");
        Assertions.assertTrue(user.isPresent());
    }

    @Test
    void testAddUser() {
        User user = User.builder()
                .username("testuser")
                .password(encoder.encode("1234"))
                .authorities("ROLE_USER")
                .fullName("TEST USER")
                .build();

        user = userRepos.save(user);

        // Test if userRepos save successfully
        Assertions.assertNotNull(user.getId());

        // Find user by username
        user = userRepos.findByUsername("testuser").orElse(null);
        Assertions.assertNotNull(user);
        Assertions.assertEquals(user.getUsername(), "testuser");
    }

}
