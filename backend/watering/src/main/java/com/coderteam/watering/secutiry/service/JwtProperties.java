package com.coderteam.watering.secutiry.service;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("jwt")
@Component
@Data
public class JwtProperties {

    String token;

    Long timeout;

    Long refreshTimeout;

}
