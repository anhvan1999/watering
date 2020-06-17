package com.coderteam.watering.device.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class MotorStatusTest {

    @Test
    void testMotorStatus() {
        Motor motor = Motor.builder()
                .id(1L)
                .deviceId("id9_1")
                .build();

        MotorStatus motorStatus = MotorStatus.builder()
                .status((short)3)
                .motor(motor)
                .build();

        Assertions.assertEquals(motor, motorStatus.getMotor());
        Assertions.assertNull(motorStatus.getId());
        Assertions.assertEquals((short)3, motorStatus.getStatus());
    }

}
