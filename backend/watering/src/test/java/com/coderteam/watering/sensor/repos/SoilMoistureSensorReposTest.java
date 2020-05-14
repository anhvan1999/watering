package com.coderteam.watering.sensor.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.sensor.entity.SoilMoistureSensor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class SoilMoistureSensorReposTest extends BaseTestSuite {

    @Autowired
    SoilMoistureSensorRepos repos;

    @Test
    void testSoilMoistureSensorRepos() {
        SoilMoistureSensor sensor = SoilMoistureSensor.builder()
                .deviceId("id_1")
                .build();

        sensor = repos.save(sensor);

        Assertions.assertNotNull(sensor.getId());
        Assertions.assertEquals("id_1", sensor.getDeviceId());
    }

}
