package com.coderteam.watering.security.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.secutiry.repos.UserRepos;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserReposTest extends BaseTestSuite {

    @Autowired
    UserRepos userRepos;

    @Test
    void testSuperUser() {
        var user = userRepos.findByUsername("superuser");
        Assertions.assertTrue(user.isPresent());
    }

}
