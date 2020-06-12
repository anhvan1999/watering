package com.coderteam.watering.mqtt.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.integration.transformer.GenericTransformer;

public class MqttMessageTransformer implements GenericTransformer<String, MqttPayload> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public MqttPayload transform(String source) {
        try {
            MqttPayload[] result = mapper.readValue(source, MqttPayload[].class);
            if (result.length > 0) {
                return result[0];
            }
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
