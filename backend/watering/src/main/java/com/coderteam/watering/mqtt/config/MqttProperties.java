package com.coderteam.watering.mqtt.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "mqtt")
@Component
@Data
public class MqttProperties {

    private String brokerUrl;

    private String clientId;

    private String[] topicFilter;

}
