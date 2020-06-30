package com.coderteam.watering.websocket.controller;

import com.coderteam.watering.mqtt.MqttService;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import java.util.Optional;
import com.coderteam.watering.device.entity.Motor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.coderteam.watering.device.repos.MotorRepos;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class MotorWsController {
    private final MqttService mqttService;
   
    @Autowired
    private  MotorRepos repos;

    public MotorWsController(MqttService mqttService) {
        this.mqttService = mqttService;
    }

    @MessageMapping("/motor/control")
    public void controlMotor(MotorControlInfo info) {
        mqttService.setMotorStatus(info.getDeviceId(), info.getValue());
        System.out.println(info);
    }

    @PostMapping("/motor/control")
    public void edit(@Valid @RequestBody MotorUpdate motor){
        Optional<Motor> motorOptional = repos.findByDeviceId(motor.id);
        Motor motorfound = motorOptional.get();
        if (motor.function.equals("LOWER")){
            motorfound.setLowerSensorBound(motor.value);
            repos.save(motorfound);
           
        }
        else 
            {
            motorfound.setUpperSensorBound(motor.value);
            repos.save(motorfound);
            }
    }
}
@Data
class MotorUpdate{
    public String function;
    public Short value;
    public String id;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class MotorControlInfo {
    
    private String deviceId;

    private Integer value;

}
