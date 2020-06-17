package com.coderteam.watering.mqtt;

import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.mqtt.config.MqttPayload;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Configuration
@AllArgsConstructor
public class MqttMessageHandler {

    private final MqttDatabaseService mqttDatabaseService;

    private final SimpMessagingTemplate template;

    @ServiceActivator(inputChannel = "soilMoistureChannel")
    public void soidMoistureDatabaseHandler(MqttPayload payload, @Header(MqttHeaders.RECEIVED_TOPIC) String topic) {
        SoilMoisture soilMoisture = mqttDatabaseService.saveSensorDataToDatabase(payload);
        System.out.println(topic + ":" + payload);
        template.convertAndSend("/topic/sensor", soilMoisture);
    }

    @ServiceActivator(inputChannel = "motorStatusChannel")
    public void motorStatusDatabaseHandler(MqttPayload payload, @Header(MqttHeaders.RECEIVED_TOPIC) String topic) {
        //MotorStatus motorStatus = mqttDatabaseService.saveMotorStatusToDatabase(payload);
        System.out.println(topic + ":" + payload);
        //template.convertAndSend("/topic/motor/status", motorStatus);
    }

    @ServiceActivator(inputChannel = "ignoreChannel")
    public void gpsChannel(MqttPayload payload) {
        // System.out.println(payload);
    }

}
