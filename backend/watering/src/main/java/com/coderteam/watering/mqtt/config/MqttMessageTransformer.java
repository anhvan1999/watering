package com.coderteam.watering.mqtt.config;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.integration.transformer.GenericTransformer;

public class MqttMessageTransformer implements GenericTransformer<String, MqttPayload> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public MqttPayload transform(String source) {
        System.out.println(source);
        try {
            if (source.startsWith("[")) {
                MqttPayload[] result = mapper.readValue(source, MqttPayload[].class);
                if (result.length > 0) {
                    return result[0];
                }
            } else {
                MqttPayload result = mapper.readValue(source, MqttPayload.class);
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
