package com.coderteam.watering.mqtt.config;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MqttPayload {
    
    @JsonProperty("device_id")
    private String deviceId;

    @JsonProperty("value")
    private String[] value;
    
}
