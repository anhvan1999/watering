package com.coderteam.watering.sensor.repos;

import com.coderteam.watering.sensor.entity.SoilMoistureSensor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoilMoistureSensorRepos extends JpaRepository<SoilMoistureSensor, Long> {
    
}
