package com.coderteam.watering.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * @author Dang Anh Van
 */
@Controller
public class SensorInfoController {
    
    @MessageMapping("/info")
    @SendTo("/topic/info")
    public String getInfo() {
        return "Test websocket connection";
    }
    
}
