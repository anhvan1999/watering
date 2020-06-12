package com.coderteam.watering.mqtt.config;

import java.util.ArrayList;
import java.util.Collection;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.Router;
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
import org.springframework.integration.router.AbstractMessageRouter;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

/**
 * @author Dang Anh Van
 * 
 * This class contains all mqtt configurations:<br>
 * - Inbound adapter<br>
 * - Outbound adapter<br>
 * - Message channels<br>
 */
@Configuration
public class MqttIntegrationConfig {

    // Load config from yml file
    private final MqttProperties mqttProperties;

    public MqttIntegrationConfig(MqttProperties mqttProperties) {
        this.mqttProperties = mqttProperties;
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
    public MessageChannel mqttInputChannel() {
        return new PublishSubscribeChannel();
    }

    @Bean
    public MqttPahoMessageDrivenChannelAdapter inbound() {
        // Create mqtt paho adapter
        MqttPahoMessageDrivenChannelAdapter adapter
                = new MqttPahoMessageDrivenChannelAdapter(
                mqttProperties.getClientId(),
                mqttClientFactory(),
                mqttProperties.getSubscribeTopic(),
                mqttProperties.getPublishTopic()
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
                //.transform(Transformers.fromJson(MqttPayload.class))
                .transform(new MqttMessageTransformer())
                .channel(mqttInputChannel)
                .get();
    }

    @Bean
    public MessageChannel soilMoistureChannel() {
        return new PublishSubscribeChannel();
    }

    @Bean
    public MessageChannel gpsChannel() {
        return new PublishSubscribeChannel();
    }

    @Bean
    public MessageChannel motorStatusChannel() {
        return new PublishSubscribeChannel();
    }

    /**
     * Listen from input channel, route to appropriate device channel:
     * gpsChannel, motorStatusChannel, soilMoistureChannel
     * @return messagerouter
     */
    @Bean
    @Router(inputChannel = "mqttInputChannel")
    public AbstractMessageRouter mqttInputRouter() {
        return new AbstractMessageRouter() {

            @Override
            protected Collection<MessageChannel> determineTargetChannels(Message<?> message) {
                // Convert to MqttPayload
                MqttPayload payload = (MqttPayload) message.getPayload();

                // Extract device id
                String deviceId = payload.getDeviceId();

                // List channel
                ArrayList<MessageChannel> listChannel = new ArrayList<>();

                if (deviceId.startsWith("Speaker")) {
                    listChannel.add(motorStatusChannel());
                } else if (deviceId.startsWith("Mois")) {
                    listChannel.add(soilMoistureChannel());
                } else {
                    listChannel.add(gpsChannel());
                }

                return listChannel;
            }

        };
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
    public IntegrationFlow outboundFlow(MessageChannel mqttObjectOutboundChannel, 
            MessageChannel mqttOutboundChannel) {
        return IntegrationFlows.from(mqttObjectOutboundChannel)
                .transform(Transformers.toJson())
                .channel(mqttOutboundChannel)
                .get();
    }

    /**
     * This message handler push data to mqtt broker
     */
    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound() {
        MqttPahoMessageHandler messageHandler =
                new MqttPahoMessageHandler("publisherClient", mqttClientFactory());
        messageHandler.setAsync(true);
        messageHandler.setDefaultQos(1);
        messageHandler.setDefaultTopic(mqttProperties.getPublishTopic());
        return messageHandler;
    }
    
}
