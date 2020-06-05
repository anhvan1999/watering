package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.Motor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MotorRepos extends JpaRepository<Motor, Long> {

    Optional<Motor> findByDeviceId(String deviceId);

}
