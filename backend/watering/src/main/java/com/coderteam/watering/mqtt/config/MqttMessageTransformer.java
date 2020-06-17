package com.coderteam.watering.mqtt.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.integration.transformer.GenericTransformer;

public class MqttMessageTransformer implements GenericTransformer<String, MqttPayload> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public MqttPayload transform(String source) {
        if (source.contains("Mois") || source.contains("Speaker")) {
            System.out.println(source);
        }
        try {
            if (source.startsWith("[")) {
                MqttPayload[] result = mapper.readValue(source, MqttPayload[].class);
                if (result.length > 0) {
                    return result[0];
                }
            } else {
                return mapper.readValue(source, MqttPayload.class);
            }
        } catch (Exception e) {
            // e.printStackTrace();
        }
        return MqttPayload.builder().deviceId("notValid").build();
    }

}
