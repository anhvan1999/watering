package com.coderteam.watering.mqtt.config;

import lombok.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

/**
 * @author Dang Anh Van
 * 
 * This class is used to load propeties from config file,
 * see application.yml for infomation
 */
@ConfigurationProperties("mqtt")
@ConstructorBinding
@Value
public class MqttProperties {

    String brokerUrl;

    String clientId;

    String publishTopic;

    String[] subscribeTopics;

    String username;
    
    String password;

}
