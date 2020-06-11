package com.coderteam.watering.device.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.coderteam.watering.device.entity.SoilMoistureSensor;
import com.coderteam.watering.device.repos.SoilMoistureSensorRepos;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    private final SoilMoistureSensorRepos repos;

    public SensorController(SoilMoistureSensorRepos repos) {
        this.repos = repos;
    }

    @GetMapping("/list")
    public List<SoilMoistureSensor> getList() {
        return repos.findAll();
    }
    
}
