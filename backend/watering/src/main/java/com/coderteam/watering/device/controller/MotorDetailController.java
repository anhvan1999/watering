package com.coderteam.watering.device.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.coderteam.watering.device.entity.MotorStatus;
import com.coderteam.watering.device.repos.MotorStatusRepos;

@RestController
@RequestMapping("/motordetail")
public class MotorDetailController {

    private final MotorStatusRepos repos;

    public MotorDetailController(MotorStatusRepos repos) {
        this.repos = repos;
    }

    @GetMapping("/list")
    public List<MotorStatus> getList() {
        return repos.findAll();
    }
    
}