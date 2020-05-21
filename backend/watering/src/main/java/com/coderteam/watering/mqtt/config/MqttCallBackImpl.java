package com.coderteam.watering.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
class MqttCallBackImpl implements MqttCallback {

    private final SimpMessagingTemplate messagingTemplate;

    public MqttCallBackImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void connectionLost(Throwable throwable) {

    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) {
        System.out.println("Get message");
        String message = new String(mqttMessage.getPayload());
        System.out.printf("Topic: %s, content: %s\n", topic, message);
        messagingTemplate.convertAndSend("/topic/info", message);
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

    }

}
