package com.coderteam.watering.mqtt.config;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dang Anh Van
 * 
 * This class represent json payload which we get from mqtt message broker
 */
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
