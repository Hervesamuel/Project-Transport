package com.Gestion_transport.Sit_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "reservation")

public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_res")
    private Long id_res;

    @Column(name = "id_vehicule", nullable = false)
    private Long id_veh;

    @Column(name = "nom_voyageur", nullable = false, length = 100)
    private String nom_voyageur;

    @Column(name = "tel", nullable = false, length = 20)
    private String tel;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "ville_depart", nullable = false, length = 50)
    private String ville_depart;

    @Column(name = "ville_arrive", nullable = false, length = 50)
    private String ville_arrive;

    @Column(name = "date_reservation", nullable = false)
    private LocalDate date_reservation;
}