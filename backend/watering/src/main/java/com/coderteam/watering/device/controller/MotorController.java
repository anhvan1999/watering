package com.coderteam.watering.device.controller;

import java.util.List;

import com.coderteam.watering.device.entity.Motor;
import com.coderteam.watering.device.repos.MotorRepos;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/motor")
public class MotorController {
    
    private final MotorRepos repos;

    public MotorController(MotorRepos repos) {
        this.repos = repos;
    }

    @GetMapping("/list")
    public List<Motor> getList() {
        return repos.findAll();
    }

}
