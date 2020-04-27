package com.coderteam.watering.secutiry.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.coderteam.watering.secutiry.entity.User;

@Repository
public interface UserRepos extends CrudRepository<User, Long> {

}
