package com.coderteam.watering.device.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.device.entity.Motor;
import com.coderteam.watering.device.entity.MotorStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class MotorStatusReposTest extends BaseTestSuite {

    @Autowired
    private MotorRepos motorRepos;

    @Autowired
    private MotorStatusRepos motorStatusRepos;

    @Test
    void testMotorStatusRepos() {
        Motor motor = Motor.builder()
                .deviceId("id9_1")
                .build();
        motorRepos.save(motor);

        MotorStatus motorStatus = MotorStatus.builder()
                .motor(motorRepos.findByDeviceId("id9_1").orElseThrow())
                .status(1)
                .build();
        motorStatus = motorStatusRepos.save(motorStatus);
        Assertions.assertNotNull(motorStatus.getId());

        Long id = motorStatus.getId();

        motorStatus = motorStatusRepos.findById(id).orElseThrow();
        Assertions.assertEquals(1, motorStatus.getStatus());
        Assertions.assertEquals("id9_1", motorStatus.getMotor().getDeviceId());
    }

}
