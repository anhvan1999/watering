package com.coderteam.watering.mqtt.config;

import lombok.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("mqtt")
@ConstructorBinding
@Value
public class MqttProperties {

    String brokerUrl;

    String clientId;

    String publishTopic;

    String subscribeTopic;

    String username;
    
    String password;

}
