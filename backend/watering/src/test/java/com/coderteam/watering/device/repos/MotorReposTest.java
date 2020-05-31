package com.coderteam.watering.device.repos;

import com.coderteam.watering.BaseTestSuite;
import com.coderteam.watering.device.entity.Motor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class MotorReposTest extends BaseTestSuite {

    private final MotorRepos motorRepos;

    @Autowired
    public MotorReposTest(MotorRepos repos) {
        motorRepos = repos;
    }

    @Test
    void testMotorRepos() {
        Motor motor = Motor.builder().deviceId("id9_1")
                .build();

        motor = motorRepos.save(motor);

        Assertions.assertNotNull(motor.getId());
        Assertions.assertEquals("id9_1", motor.getDeviceId());

        motor = motorRepos.findByDeviceId("id9_1").orElse(null);
        Assertions.assertNotNull(motor);
    }

}
