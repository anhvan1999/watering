package com.coderteam.watering.device.controller;
import java.util.List;
import java.util.stream.Collectors;

import com.coderteam.watering.device.entity.HistoryInfo;
import com.coderteam.watering.device.repos.HistoryRepository;
import com.coderteam.watering.secutiry.config.JwtAuthentication;
import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
/**
 * @author : Nguyen Trong TRUNG
 */
@RestController
@AllArgsConstructor
@RequestMapping("/history")
public class HistoryController {

    private final HistoryRepository repository;
    private final UserRepos userRepos;

    @GetMapping("/list")
    public List<HistoryInfo> getList(){
        JwtAuthentication jwtAuthentication = (JwtAuthentication)
                SecurityContextHolder.getContext().getAuthentication();
        User user= userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
        List<HistoryInfo> listHistory = repository.findAll();
        return  listHistory.stream()
                .filter(item -> item.getUsername().equals(user.getUsername()))
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public void addEvent(@RequestBody Event history){
        JwtAuthentication jwtAuthentication = (JwtAuthentication)
                SecurityContextHolder.getContext().getAuthentication();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        User user= userRepos.findById(jwtAuthentication.getUserId()).orElse(null);
        HistoryInfo info = HistoryInfo.builder()
                .username(user.getUsername())
                .action(history.eventName)
                .time(dtf.format(LocalDateTime.now())).build();
        repository.save(info);
    }
}

@Data
class Event{
    public String eventName;
}