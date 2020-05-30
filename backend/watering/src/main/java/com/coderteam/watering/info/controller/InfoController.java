/**
 * @author Dang Anh Van
 */

package com.coderteam.watering.info.controller;

import com.coderteam.watering.mqtt.SendGateway;
import com.coderteam.watering.mqtt.config.MqttPayload;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// This controller is used for test puporse
@RestController
@RequestMapping("/info")
public class InfoController {

    private UserRepos repos;

    private SendGateway sendGateway;

    public InfoController(UserRepos repos, SendGateway sendGateway) {
        this.repos = repos;
        this.sendGateway = sendGateway;
    }

    // This method checks to see if you have installed project correctly
    @GetMapping("")
    public String getBasicInfo() {
        sendGateway.setMotorStatus(MqttPayload.builder()
            .deviceId("id9_1").value(new String[]{"3", "2"}).build());
        return "Hello world";
    }

    // Check if user login successful
    @GetMapping("/user")
    public String getUserInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/adduser")
    public Object addUser() {
        User user = new User();
        user.setFullName("Dang Anh Van");
        user.setUsername("danganhvan" + Math.random());
        user.setPassword("123444");
        user.setAuthorities(List.of(new SimpleGrantedAuthority("ROLE_USER")));
        repos.save(user);
        return repos.findAll();
    }

}
