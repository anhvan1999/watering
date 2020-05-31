package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.MotorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotorStatusRepos extends JpaRepository<MotorStatus, Long> {

}
