package com.Gestion_transport.Sit_web.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name ="notification")

public class Notification {

    // ID de la notification
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Message de notification
    @Column(name = "message")
    private String message;


    // Date de la notification
    @Column(name = "date")
    private LocalDateTime date;

    // Etat de la notification (lu ou non)
    @Column(name = "lu")
    private boolean lu;
}
