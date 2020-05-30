package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.SoilMoistureSensor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoilMoistureSensorRepos extends JpaRepository<SoilMoistureSensor, Long> {
    
}
