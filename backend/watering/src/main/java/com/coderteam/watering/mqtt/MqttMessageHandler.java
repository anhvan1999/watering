package com.coderteam.watering.mqtt;

import com.coderteam.watering.mqtt.config.MqttPayload;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;

@Configuration
@AllArgsConstructor
public class MqttMessageHandler {

    private final MqttDatabaseService mqttDatabaseService;

    @ServiceActivator(inputChannel = "soilMoistureChannel")
    public void soidMoistureDatabaseHandler(MqttPayload payload) {
        mqttDatabaseService.saveSensorDataToDatabase(payload);
    }

    @ServiceActivator(inputChannel = "motorStatusChannel")
    public void motorStatusDatabaseHandler(MqttPayload payload) {
        System.out.println(payload);
        mqttDatabaseService.saveMotorStatusToDatabase(payload);
    }

}
