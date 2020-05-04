package com.coderteam.watering.info.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ws/websocket")
public class WebsocketController {

    @GetMapping("")
    public String getWebsocketTestPage() {
        return "websocket";
    }

}
