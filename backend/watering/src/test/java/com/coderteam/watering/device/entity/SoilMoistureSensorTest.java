package com.coderteam.watering.device.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class SoilMoistureSensorTest {
    
    @Test
    void testSoilMoistureSensor() {
        SoilMoistureSensor sensor = SoilMoistureSensor
                .builder()
                .id(10L)
                .deviceId("deviceId")
                .build();
        
        Assertions.assertEquals(10L, sensor.getId());
        Assertions.assertEquals("deviceId", sensor.getDeviceId());
    }

}
