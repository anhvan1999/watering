package com.coderteam.watering.mqtt;

import com.coderteam.watering.mqtt.config.MqttPayload;
import com.coderteam.watering.mqtt.config.MqttPayload.MqttPayloadBuilder;

import org.springframework.stereotype.Service;

/**
 * @author Dang Anh Van
 * 
 * This class contains logic to control motor
 */
@Service
public class MqttService {

    private final SendGateway gateway;

    public MqttService(SendGateway gateway) {
        this.gateway = gateway;
    }

    /**
     * This method is used to set motor status
     * @param deviceId device_id of motor
     * @param value if value = 0, then turn off motor, else set status = 1
     * and value, value must in range [0..3] 
     */
    public void setMotorStatus(String deviceId, int value) {
        if (value < 0 || value > 3) {
            throw new RuntimeException("Invalid status");
        }

        MqttPayloadBuilder payloadBuilder = MqttPayload.builder()
                .deviceId(deviceId);

        if (value == 0) {
            payloadBuilder.values(new String[] {"0", "1"});
        } else {
            payloadBuilder.values(new String[] {"1", Integer.toString(value)});
        }

        gateway.setMotorStatus(payloadBuilder.build());
    }

}
