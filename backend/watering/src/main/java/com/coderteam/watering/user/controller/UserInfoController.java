package com.coderteam.watering.user.controller;

import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/info")
public class UserInfoController {

    private UserRepos userRepos;

    public UserInfoController(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @GetMapping("")
    public User getUser() {
        JwtAuthentication jwtAuthentication = (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        return userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
    }

}
