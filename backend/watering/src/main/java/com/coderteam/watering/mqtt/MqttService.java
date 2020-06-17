package com.coderteam.watering.mqtt;

import com.coderteam.watering.device.entity.MotorStatus;
import com.coderteam.watering.mqtt.config.MqttPayload;
import com.coderteam.watering.mqtt.config.MqttPayload.MqttPayloadBuilder;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * @author Dang Anh Van
 * <p>
 * This class contains logic to control motor
 */
@Service
public class MqttService {

    private final SendGateway gateway;

    private final SimpMessagingTemplate template;

    private final MqttDatabaseService databaseService;

    public MqttService(SendGateway gateway, SimpMessagingTemplate template, MqttDatabaseService databaseService) {
        this.gateway = gateway;
        this.template = template;
        this.databaseService = databaseService;
    }

    /**
     * This method is used to set motor status
     *
     * @param deviceId device_id of motor
     * @param value    if value = 0, then turn off motor, else set status = 1
     *                 and value, value must in range [0..3]
     */
    public void setMotorStatus(String deviceId, int value) {
        if (value < 0 || value > 5000) {
            throw new RuntimeException("Invalid status");
        }

        MqttPayloadBuilder payloadBuilder = MqttPayload.builder()
                .deviceId(deviceId);

        if (value == 0) {
            payloadBuilder.values(new String[]{"0", "0"});
        } else {
            payloadBuilder.values(new String[]{"1", Integer.toString(value)});
        }

        MqttPayload payload = payloadBuilder.build();

        gateway.setMotorStatus(new MqttPayload[]{payload});

        MotorStatus status = databaseService.saveMotorStatusToDatabase(payload);

        template.convertAndSend("/topic/motor/status", status);
    }

}
