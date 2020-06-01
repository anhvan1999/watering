package com.coderteam.watering.mqtt;

import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.mqtt.config.MqttPayload;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Configuration
@AllArgsConstructor
public class MqttMessageHandler {

    private final MqttDatabaseService mqttDatabaseService;

    private final SimpMessagingTemplate template;

    @ServiceActivator(inputChannel = "soilMoistureChannel")
    public void soidMoistureDatabaseHandler(MqttPayload payload) {
        SoilMoisture soilMoisture = mqttDatabaseService.saveSensorDataToDatabase(payload);
        template.convertAndSend("/topic/sensor", soilMoisture);
    }

    @ServiceActivator(inputChannel = "motorStatusChannel")
    public void motorStatusDatabaseHandler(MqttPayload payload) {
        System.out.println(payload);
        mqttDatabaseService.saveMotorStatusToDatabase(payload);
    }

}
