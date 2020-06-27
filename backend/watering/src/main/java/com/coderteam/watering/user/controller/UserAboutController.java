package com.coderteam.watering.user.controller;

import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.String;
/**
 * @author : Nguyen Trong TRUNG
 */
@RestController
@AllArgsConstructor
@RequestMapping("/user/info/about")
public class UserAboutController {
    private final UserRepos userRepos;
    private final PasswordEncoder passwordEncoder;

    @PutMapping("/changeFullName")
    public User changeFullName(@Valid @RequestBody String newFullName){
        JwtAuthentication jwtAuthentication = (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        User user = userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
        if (user!=null)
        {
            user.setFullName(newFullName);
            return userRepos.save(user);
        }
        else {
            return user;
        }
    }

    @PutMapping("/changePassword")
    public User changePassword( @Valid @RequestBody String newPassword){
        JwtAuthentication jwtAuthentication = (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        User user = userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
        if (user!=null)
        {
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepos.save(user);
        }
        else {
            return user;
        }
    }
}
