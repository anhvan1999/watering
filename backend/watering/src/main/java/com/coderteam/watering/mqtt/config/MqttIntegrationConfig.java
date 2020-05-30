package com.coderteam.watering.mqtt.config;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.dsl.Transformers;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
public class MqttIntegrationConfig {

    // Load config from yml file
    private MqttProperties mqttProperties;

    public MqttIntegrationConfig(MqttProperties mqttProperties) {
        this.mqttProperties = mqttProperties;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new PublishSubscribeChannel();
    }

    @Bean
    public MqttPahoMessageDrivenChannelAdapter inbound() {
        // Create mqtt paho adapter
        MqttPahoMessageDrivenChannelAdapter adapter
                = new MqttPahoMessageDrivenChannelAdapter(
                mqttProperties.getBrokerUrl(),
                mqttProperties.getClientId(),
                mqttProperties.getSubscribeTopic()
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

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        // MqttPahoClientFactory
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();

        // Register connect option
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[] {mqttProperties.getBrokerUrl()});
        options.setUserName(mqttProperties.getUsername());
        options.setPassword(mqttProperties.getPassword().toCharArray());
        factory.setConnectionOptions(options);

        // Create factory
        return factory;
    }

    @Bean
    public IntegrationFlow outboundFlow(MessageChannel mqttObjectOutboundChannel, 
            MessageChannel mqttOutboundChannel) {
        return IntegrationFlows.from(mqttObjectOutboundChannel)
                .transform(Transformers.toJson())
                .channel(mqttOutboundChannel)
                .get();
    }

    @Bean
    public MessageChannel mqttObjectOutboundChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageChannel mqttOutboundChannel() {
        return new DirectChannel();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound() {
        MqttPahoMessageHandler messageHandler =
                new MqttPahoMessageHandler("publisherClient", mqttClientFactory());
        messageHandler.setAsync(true);
        messageHandler.setDefaultTopic(mqttProperties.getPublishTopic());
        return messageHandler;
        // return p -> System.out.println(p.getPayload());
    }
    
}
