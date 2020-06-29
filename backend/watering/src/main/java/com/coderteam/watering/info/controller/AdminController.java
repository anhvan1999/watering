package com.coderteam.watering.info.controller;

import java.util.List;
import java.util.Optional;

import com.coderteam.watering.secutiry.entity.User;
import com.coderteam.watering.secutiry.repos.UserRepos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@RestController
@RequestMapping("/admin")
public class AdminController{

    @Autowired
    private UserRepos repos;

    @GetMapping("")
    public List<User> list(){
        List <User> result = (List <User>)repos.findAll();
        return result;
    }
    @PostMapping("/add")
    public Boolean save(@RequestBody TempUser user){
        Optional<User> userOptional = repos.findByUsername(user.username);
        if (!userOptional.isEmpty())
            return false;        
        User usernew = new User();
        usernew.setFullName(user.fullname);
        usernew.setUsername(user.username);
        usernew.setPassword(user.password);
        usernew.setAuthorities(List.of(new SimpleGrantedAuthority("ROLE_USER")));
        repos.save(usernew);
        return true;
    }

    @PostMapping("")
    public List<User> deleteuser(@RequestBody DeleteUser user){
        repos.deleteById(user.id);
        List <User> result = (List <User>)repos.findAll();
        return result;
    }

}
@Data
class TempUser{
    public String username;
    public String fullname;
    public String password;
    public String repeatpassword;
}
@Data 
class DeleteUser{
    public Long id;
}