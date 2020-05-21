package com.coderteam.watering.mqtt.config;

import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    private final MqttProperties mqttProperties;

    private final MqttCallback mqttCallback;

    public MqttConfig(MqttProperties properties, MqttCallback callback) {
        mqttProperties = properties;
        mqttCallback = callback;
    }

    /**
     * @return MqttClient object
     * @throws Exception if connection failed
     */
    @Bean
    public MqttClient mqttClient() throws Exception {
        MemoryPersistence persistence = new MemoryPersistence();

        // Create new mqttClientObject
        MqttClient mqttClient = new MqttClient(
                mqttProperties.getBrokerUrl(),
                mqttProperties.getClientId(),
                persistence
        );

        // Callbacks
        mqttClient.setCallback(mqttCallback);

        // Options
        mqttClient.connect(mqttConnectOptions());

        // Subcribe to topics
        mqttClient.subscribe(mqttProperties.getTopicFilter());

        return mqttClient;
    }

    /**
     * @return mqtt connect options
     */
    private MqttConnectOptions mqttConnectOptions() {
        MqttConnectOptions options = new MqttConnectOptions();

        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(20);

        return options;
    }

}
