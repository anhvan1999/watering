package com.coderteam.watering.mqtt;

import com.coderteam.watering.mqtt.config.MqttPayload;

import org.springframework.integration.annotation.MessagingGateway;

@MessagingGateway(defaultRequestChannel = "mqttObjectOutboundChannel")
interface SendGateway {
    
    void setMotorStatus(MqttPayload payload);

}
