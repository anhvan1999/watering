package com.coderteam.watering.device.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.device.entity.SoilMoistureSensor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SoilMoistureReposTest extends BaseTestSuite {

    @Autowired
    SoilMoistureRepos repos;

    @Autowired
    SoilMoistureSensorRepos sensorRepos;

    @Test
    void testSoilMoistureRepos() {
        // Insert sensor into database
        SoilMoistureSensor sensor = SoilMoistureSensor.builder()
                .deviceId("id_1")
                .build();
        sensor = sensorRepos.save(sensor);

        // Sensor Data
        SoilMoisture sensorData = SoilMoisture.builder()
                .sensor(sensor)
                .value((short) 1020)
                .status(true)
                .build();
        sensorData = repos.save(sensorData);

        // Check generated id
        Assertions.assertEquals(sensor, sensorData.getSensor());
        Assertions.assertNotNull(sensor.getId());

        Long id = sensorData.getId();
        sensorData = repos.findById(id).orElse(null);
        Assertions.assertNotNull(sensorData);
        Assertions.assertNotNull(sensorData.getSensor());
    }

}
