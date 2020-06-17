package com.coderteam.watering.mqtt;

import java.util.List;

import com.coderteam.watering.device.entity.Motor;
import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.device.repos.MotorRepos;
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

    private final MotorRepos motorRepos;

    private final SimpMessagingTemplate template;

    private final MqttService mqttService;

    @ServiceActivator(inputChannel = "soilMoistureChannel")
    public void soidMoistureDatabaseHandler(MqttPayload payload, @Header(MqttHeaders.RECEIVED_TOPIC) String topic) {
        SoilMoisture soilMoisture = mqttDatabaseService.saveSensorDataToDatabase(payload);
        System.out.println(topic + ":" + payload);
        template.convertAndSend("/topic/sensor", soilMoisture);
        autoSetMotorStatus(soilMoisture.getValue());
    }

    public void autoSetMotorStatus(short sensorValue) {
        System.out.println("Check " + sensorValue);
        List<Motor> motorList = motorRepos.findAll();

        for (Motor m: motorList) {
            if (sensorValue < m.getLowerSensorBound()) {
                mqttService.setMotorStatus(m.getDeviceId(), 800);
            } else if (sensorValue > m.getUpperSensorBound()) {
                mqttService.setMotorStatus(m.getDeviceId(), 0);
            }
        }
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
