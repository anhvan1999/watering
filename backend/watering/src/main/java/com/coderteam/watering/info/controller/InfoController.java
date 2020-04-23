/**
 * @author Dang Anh Van
 */

package com.coderteam.watering.info.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// This controller is used for test puporse
@RestController
@RequestMapping("/info")
public class InfoController {

    // This method checks to see if you have installed project correctly
    @GetMapping("")
    public String getBasicInfo() {
        return "Hello world";
    }

    // Check if user login successful
    @GetMapping("/user")
    public String getUserInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
