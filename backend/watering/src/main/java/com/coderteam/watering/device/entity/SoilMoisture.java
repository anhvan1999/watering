package com.coderteam.watering.device.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.*;

import java.time.Instant;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoilMoisture {

    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Short value;

    @Column(nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(nullable = false)
    private SoilMoistureSensor sensor;

    @Column(nullable = false)
    @Builder.Default
    private Instant publishTime = Instant.now();

}
