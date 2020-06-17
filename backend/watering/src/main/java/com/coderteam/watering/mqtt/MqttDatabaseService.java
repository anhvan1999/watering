package com.coderteam.watering.mqtt;

import com.coderteam.watering.device.entity.Motor;
import com.coderteam.watering.device.entity.MotorStatus;
import com.coderteam.watering.device.entity.SoilMoisture;
import com.coderteam.watering.device.entity.SoilMoistureSensor;
import com.coderteam.watering.device.repos.MotorRepos;
import com.coderteam.watering.device.repos.MotorStatusRepos;
import com.coderteam.watering.device.repos.SoilMoistureRepos;
import com.coderteam.watering.device.repos.SoilMoistureSensorRepos;
import com.coderteam.watering.mqtt.config.MqttPayload;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MqttDatabaseService {

    private final SoilMoistureSensorRepos sensorRepos;

    private final SoilMoistureRepos valueRepos;

    private final MotorRepos motorRepos;

    private final MotorStatusRepos motorStatusRepos;

    public SoilMoisture saveSensorDataToDatabase(MqttPayload mqttPayload) {
        // Load sensor - create if not exist
        String deviceId = mqttPayload.getDeviceId();
        SoilMoistureSensor sensor = sensorRepos.findByDeviceId(deviceId).orElse(null);
        if (sensor == null) {
            sensor = sensorRepos.save(
                    SoilMoistureSensor.builder()
                            .deviceId(deviceId)
                            .build()
            );
        }

        // Save sensor value to database
        String[] sensorValueArr = mqttPayload.getValues();
        Short sensorValue = Short.parseShort(sensorValueArr[0]);

        // Set current value for sensor
        sensor.setCurrentValue(sensorValue);
        sensor = sensorRepos.save(sensor);

        // Save value
        SoilMoisture value = SoilMoisture
                .builder()
                .value(sensorValue)
                .sensor(sensor)
                .build();

        return valueRepos.save(value);
    }

    public MotorStatus saveMotorStatusToDatabase(MqttPayload mqttPayload) {
        // Load motor - create if not exist
        String deviceId = mqttPayload.getDeviceId();
        Motor motor = motorRepos.findByDeviceId(deviceId).orElse(null);
        if (motor == null) {
            motor = motorRepos.save(
                    Motor.builder()
                            .deviceId(deviceId)
                            .build()
            );
        }

        // Save motor status to database
        String[] motorStatusStr = mqttPayload.getValues();
        int status = 0;
        if (motorStatusStr[0].equals("1")) {
            status = Integer.parseInt(motorStatusStr[1]);
        }

        // Create and save
        MotorStatus motorStatus = MotorStatus.builder()
                .motor(motor)
                .status(status)
                .build();
        motorStatus = motorStatusRepos.save(motorStatus);

        return motorStatus;
    }

}
