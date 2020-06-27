package com.coderteam.watering.device.entity;

import javax.persistence.*;

import lombok.*;
/**
 * @author : Nguyen Trong TRUNG
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryInfo {

    @Setter(value=AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String time;

}
