package com.coderteam.watering.device.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class MotorTest {

    @Test
    public void testMotorEntity() {
        Motor motor = Motor.builder()
                .deviceId("id9_1").build();
        Assertions.assertNull(motor.getId());
        Assertions.assertEquals(motor.getDeviceId(), "id9_1");
    }

}
