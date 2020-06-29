package com.coderteam.watering.device.repos;

import com.coderteam.watering.device.entity.HistoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author : Nguyen Trong TRUNG
 */
@Repository
public interface HistoryRepository extends JpaRepository<HistoryInfo,Long> {

}
