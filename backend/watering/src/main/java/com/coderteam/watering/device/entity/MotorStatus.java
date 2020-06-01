package com.coderteam.watering.device.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MotorStatus {

    @Setter(value = AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Motor motor;

    @Column(nullable = false)
    @Min(0)
    @Max(3)
    private Integer status;

    @Column(nullable = false)
    @Builder.Default
    private Instant publishTime = Instant.now();

}
