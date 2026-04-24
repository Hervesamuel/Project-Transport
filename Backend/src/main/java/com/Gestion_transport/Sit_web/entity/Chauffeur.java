package com.Gestion_transport.Sit_web.entity;


import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString //Génère automat la methode toString()
// Indique à Spring que c'est une table de la base de données
@Entity
@Table(name = "chauffeur")   // nom de la Table dans PostgreSQL
public class Chauffeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment de l'ID
    @Column(name = "id_chauf")
    private Long id_chauf;

    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

    @Column(name = "tel", length = 13, nullable = false, unique = true)
    private String tel;

    @Column(name = "genre", length = 8, nullable = false)
    private String genre;

    @Column(name = "email", length = 120, nullable = false)
    private String email;

}

