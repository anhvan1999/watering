package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.Motor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotorRepos extends JpaRepository<Motor, Long> {

    Optional<Motor> findByDeviceId(String deviceId);

}
