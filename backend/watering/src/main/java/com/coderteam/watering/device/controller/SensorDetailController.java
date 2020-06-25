package com.coderteam.watering.device.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.device.repos.SoilMoistureRepos;

@RestController
@RequestMapping("/sensordetail")
public class SensorDetailController {

    private final SoilMoistureRepos repos;

    public SensorDetailController(SoilMoistureRepos repos) {
        this.repos = repos;
    }

    @GetMapping("/list")
    public List<SoilMoisture> getList() {
        return repos.findAll();
    }
    
}
