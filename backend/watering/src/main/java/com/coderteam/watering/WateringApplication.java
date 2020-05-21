package com.coderteam.watering;

import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties
public class WateringApplication {

    public static void main(String[] args) {
        SpringApplication.run(WateringApplication.class, args);
    }

}

@Component
class StartupRunner implements ApplicationRunner {

    private final UserRepos userRepos;

    private final PasswordEncoder passwordEncoder;

    public StartupRunner(UserRepos repos, PasswordEncoder encoder) {
        userRepos = repos;
        passwordEncoder = encoder;
    }

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

        // Save to database
        userRepos.saveAll(List.of(superUser, user));
    }

}
