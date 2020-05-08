package com.coderteam.watering.secutiry.controller;

import java.time.Instant;

import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;
import com.coderteam.watering.secutiry.service.JwtService;
import com.coderteam.watering.secutiry.util.ErrorResponse;
import com.coderteam.watering.secutiry.util.PasswordNotValidException;
import com.coderteam.watering.secutiry.util.UserNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import lombok.Builder;
import lombok.Data;

@RestController
@RequestMapping("/auth/login")
public class LoginController {

    private JwtService jwtService;

    private UserRepos userRepos;

    private PasswordEncoder passwordEncoder;

    public LoginController(JwtService service, UserRepos repos, PasswordEncoder encoder) {
        jwtService = service;
        userRepos = repos;
        passwordEncoder = encoder;
    }

    @PostMapping("")
    public Object handleLogin(@ModelAttribute LoginInfo info) {
        // Load user from databse
        User user = userRepos
                .findByUsername(info.getUsername())
                .orElseThrow(UserNotFoundException::new);

        // Check if password is valid
        checkPassword(user.getPassword(), info.getPassword());

        // Issue date
        Instant issueDate = Instant.now();

        // JwtToken
        String jwtToken = jwtService.generateToken(
                user.getUsername(),
                user.getId(),
                user.getAuthorities(),
                JwtService.JwtType.TOKEN,
                issueDate
        );

        // JwtRefreshToken
        String jwtRefreshToken = jwtService.generateToken(
                user.getUsername(),
                user.getId(),
                user.getAuthorities(),
                JwtService.JwtType.REFRESH_TOKEN,
                issueDate
        );

        // Return token to user
        return LoginResponseInfo.builder()
                .jwtToken(jwtToken)
                .jwtRefreshtoken(jwtRefreshToken)
                .build();
    }

    void checkPassword(String encodedPassword, String password) {
        boolean isValid = passwordEncoder.matches(password, encodedPassword);
        if (!isValid) {
            throw new PasswordNotValidException();
        }
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse userNotFoundHanler() {
        return new ErrorResponse("Username not valid", "uname_not_valid");
    }

    @ExceptionHandler(PasswordNotValidException.class)
    public ErrorResponse passwordNotValidHandler() {
        return new ErrorResponse("Password not valid", "password_not_valid");
    }

}

@Data
class LoginInfo {
    private String username;
    private String password;
}

@Data
@Builder
class LoginResponseInfo {
    private String jwtToken;
    private String jwtRefreshtoken;
}
