package com.coderteam.watering.mqtt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.dsl.Transformers;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
public class MqttIntegrationConfig {

    @Bean("mqttInputChannel")
    public MessageChannel mqttInputChannel() {
        return new PublishSubscribeChannel();
    }

    @Bean
    public MqttPahoMessageDrivenChannelAdapter inbound(
            MqttProperties mqttProperties) {
        // Create mqtt paho adapter
        MqttPahoMessageDrivenChannelAdapter adapter
                = new MqttPahoMessageDrivenChannelAdapter(
                mqttProperties.getBrokerUrl(),
                mqttProperties.getClientId(),
                mqttProperties.getTopicFilter()
        );

        // Default converter
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);

        // Return the adapter
        return adapter;
    }

    @Bean
    public IntegrationFlow inboundFlow(MqttPahoMessageDrivenChannelAdapter inbound,
            MessageChannel mqttInputChannel) {
        // Add transformer convert json to object
        // Ouput to mqttInputChannel
        return IntegrationFlows.from(inbound)
                .transform(Transformers.fromJson(MqttPayload.class))
                .channel(mqttInputChannel)
                .get();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        // Default handler
        return message -> System.out.println(message.getPayload());
    }

}
