package com.coderteam.watering.secutiry.repos;

import java.util.Optional;

import com.coderteam.watering.secutiry.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepos extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
