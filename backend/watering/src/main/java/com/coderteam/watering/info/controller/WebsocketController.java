package com.coderteam.watering.info.controller;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ws/websocket")
public class WebsocketController {
    
    @GetMapping("")
    public String getWebsocketTestPage() {
        return "websocket";
    }

    @GetMapping("/publish")
    @ResponseBody
    public String publish() throws MqttException {
        return "Publish";
    }

}
