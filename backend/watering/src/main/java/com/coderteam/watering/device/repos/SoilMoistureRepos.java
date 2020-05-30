package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.SoilMoisture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoilMoistureRepos extends JpaRepository<SoilMoisture, Long> {
    
}
