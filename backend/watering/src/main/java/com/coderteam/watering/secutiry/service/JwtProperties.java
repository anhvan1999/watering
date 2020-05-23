package com.coderteam.watering.secutiry.service;

import lombok.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("jwt")
@ConstructorBinding
@Value
public class JwtProperties {

    String token;

    Long timeout;

    Long refreshTimeout;

}
