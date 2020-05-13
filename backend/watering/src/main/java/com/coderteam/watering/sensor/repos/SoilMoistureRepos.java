package com.coderteam.watering.sensor.repos;

import com.coderteam.watering.sensor.entity.SoilMoisture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoilMoistureRepos extends JpaRepository<SoilMoisture, Long> {
    
}
