package com.coderteam.watering.mqtt;

import com.coderteam.watering.BaseTestSuite;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class MqttConfigTest extends BaseTestSuite {

    private final IMqttClient mqttClient;

    @Autowired
    public MqttConfigTest(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    @Test
    void testMqttClientExist() {
        Assertions.assertNotNull(mqttClient);
    }

}
