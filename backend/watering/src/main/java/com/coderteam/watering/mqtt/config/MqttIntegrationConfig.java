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
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;

@Configuration
public class MqttIntegrationConfig {

    @Bean("mqttInputChannel")
    public MessageChannel mqttInputChannel() {
        MessageChannel channel = new PublishSubscribeChannel();
        return channel;
    }

    public MqttPahoMessageDrivenChannelAdapter inbound(MqttProperties mqttProperties) {
        MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter(
                mqttProperties.getBrokerUrl(), mqttProperties.getClientId(), mqttProperties.getTopicFilter());
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        return adapter;
    }

    @Bean
    public IntegrationFlow inboundFlow(MqttProperties mqttProperties, MessageChannel mqttInputChannel) {
        return IntegrationFlows.from(inbound(mqttProperties))
                .transform(Transformers.fromJson(MqttPayload.class))
                .channel(mqttInputChannel)
                .get();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return new MessageHandler() {

            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                System.out.println(message.getPayload());

            }

        };
    }

}
