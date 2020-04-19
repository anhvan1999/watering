package com.coderteam.watering.info.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/info")
public class InfoController {

    // This method checks to see if you have installed project correctly
    @GetMapping("")
    public String getBasicInfo() {
        return "Hello world";
    }

}
