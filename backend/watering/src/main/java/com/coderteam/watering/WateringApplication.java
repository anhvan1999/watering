package com.coderteam.watering;

import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class WateringApplication {

	public static void main(String[] args) {
		SpringApplication.run(WateringApplication.class, args);
	}

}

@Component
class StartupRunner implements ApplicationRunner {

	private UserRepos userRepos;
	private PasswordEncoder passwordEncoder;

	public StartupRunner(UserRepos repos, PasswordEncoder encoder) {
		userRepos = repos;
		passwordEncoder = encoder;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		User user = User.builder()
				.username("superuser")
				.password(passwordEncoder.encode("watering"))
				.authorities("ROLE_ADMIN")
				.fullName("Super User")
				.build();
		userRepos.save(user);
	}

}