package com.coderteam.watering.device.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Motor {

    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String deviceId;

    @Column(nullable = true)
    private Short currentValue;

    @Column
    @Builder.Default
    private Short lowerSensorBound = (short)500;

    @Column
    @Builder.Default
    private Short upperSensorBound = (short)700;

}
