package com.coderteam.watering.user.controller;

import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nguyen Trong TRUNG
 */
@RestController
@RequestMapping("/user/info/delete")
public class UserInfoDeleteController {
    private final UserRepos userRepos;

    public UserInfoDeleteController(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @PutMapping("")
    public User deleteUserAccount(){
        JwtAuthentication jwtAuthentication = (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        User user = userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
        if (user!=null)
        {
            user.setActive(false);
            return userRepos.save(user);
        }
        else
        {
            return null;
        }
    }
}
