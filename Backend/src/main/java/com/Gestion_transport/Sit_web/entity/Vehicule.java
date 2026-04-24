package com.Gestion_transport.Sit_web.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name="vehicule")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_vehicule")
    private Long id_vehicule;

    @Column(name="marque", length=50, nullable=false)
    // marque du véhicule (Toyota, Hyundai...)
    private String marque;

    @Column(name="modele", length=50, nullable = false)
    // modèle du véhicule (Hiace, Sprinter...)
    private String modele;

    @Column(name="matricule", length=15, nullable=false, unique=true)
    // plaque d'immatriculation
    private String matricule;

    @Column(name="nbr_place", nullable=false)
    // nombre de passagers
    private Integer nbr_place;

    @ManyToOne //: Indique que les entités actuelles) peuvent appartenir à un seul chauffeur.
    @JoinColumn(name = "id_chauf", nullable = false) // Le nom de la colonne dans la DB
    private Chauffeur chauffeur;

}
