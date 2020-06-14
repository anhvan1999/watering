package com.coderteam.watering.websocket.controller;

import com.coderteam.watering.mqtt.MqttService;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
public class MotorWsController {
    
    private final MqttService mqttService;

    public MotorWsController(MqttService mqttService) {
        this.mqttService = mqttService;
    }

    @MessageMapping("/motor/control")
    public void controlMotor(MotorControlInfo info) {
        mqttService.setMotorStatus(info.getDeviceId(), info.getValue());
        System.out.println(info);
    }

}

@Data
@AllArgsConstructor
@NoArgsConstructor
class MotorControlInfo {
    
    private String deviceId;

    private Integer value;

}
