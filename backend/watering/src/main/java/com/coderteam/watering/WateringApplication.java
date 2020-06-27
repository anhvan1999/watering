package com.coderteam.watering;

import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.coderteam.watering.device.entity.HistoryInfo;
import com.coderteam.watering.device.entity.Motor;
import com.coderteam.watering.device.repos.HistoryRepository;
import com.coderteam.watering.device.repos.MotorRepos;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@SpringBootApplication
@EnableConfigurationProperties
@ConfigurationPropertiesScan
public class WateringApplication {

    public static void main(String[] args) {
        SpringApplication.run(WateringApplication.class, args);
    }

}

@Component
@AllArgsConstructor
class StartupRunner implements ApplicationRunner {

    private final UserRepos userRepos;

    private final PasswordEncoder passwordEncoder;

    private final MotorRepos motorRepos;

    private final HistoryRepository historyRepository;

    @Override
    public void run(ApplicationArguments args) {
        // Create supper user when boot the app
        User superUser = User.builder()
                .username("superuser")
                .password(passwordEncoder.encode("watering"))
                .authorities("ROLE_ADMIN")
                .fullName("Super User")
                .build();

        // Create normal user
        User user = User.builder()
                .username("user")
                .password(passwordEncoder.encode("watering"))
                .authorities("ROLE_USER")
                .fullName("User")
                .build();

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        HistoryInfo info = HistoryInfo.builder()
                .username("superuser")
                .action("Sign In")
                .time(dtf.format(LocalDateTime.now())).build();

        // Save to database
        userRepos.saveAll(List.of(superUser, user));
        historyRepository.save(info);
        Motor motor = motorRepos.findByDeviceId("Speaker").orElse(null);
        if (motor == null) {
            motor = motorRepos.save(
                Motor.builder().deviceId("Speaker").build()
            );
        }
    }

}
