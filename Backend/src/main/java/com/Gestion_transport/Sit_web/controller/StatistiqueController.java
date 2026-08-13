package com.Gestion_transport.Sit_web.controller;

import com.Gestion_transport.Sit_web.entity.Chauffeur;
import com.Gestion_transport.Sit_web.entity.Vehicule;
import com.Gestion_transport.Sit_web.repository.ChauffeurRepository;
import com.Gestion_transport.Sit_web.repository.ReservationRepository;
import com.Gestion_transport.Sit_web.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

// ✅ Autorise React (port 5173)
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/statistiques")
public class StatistiqueController {

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    // ---- GET /api/statistiques ----
    // Retourne toutes les statistiques en un seul appel
    @GetMapping
    public Map<String, Object> getStatistiques() {

        Map<String, Object> stats = new HashMap<>();

        // ============ CHAUFFEURS ============

        List<Chauffeur> chauffeurs = chauffeurRepository.findAll();

        // Nombre total de chauffeurs
        stats.put("totalChauffeurs", chauffeurs.size());

        // Répartition par genre (Homme/Femme)
        Map<String, Long> parGenre = chauffeurs.stream()
                .collect(Collectors.groupingBy(
                        c -> c.getGenre() != null ? c.getGenre() : "Non défini",
                        Collectors.counting()
                ));
        stats.put("chauffeurParGenre", parGenre);

        // ============ VÉHICULES ============

        List<Vehicule> vehicules = vehiculeRepository.findAll();

        // Nombre total de véhicules
        stats.put("totalVehicules", vehicules.size());

        // Répartition par marque (Toyota, Mercedes, Hyundai...)
        Map<String, Long> parMarque = vehicules.stream()
                .collect(Collectors.groupingBy(
                        v -> v.getMarque() != null ? v.getMarque() : "Autre",
                        Collectors.counting()
                ));
        stats.put("vehiculeParMarque", parMarque);

        // Répartition par modèle (Sprinter, Hiace, Crafter...)
        Map<String, Long> parModele = vehicules.stream()
                .collect(Collectors.groupingBy(
                        v -> v.getModele() != null ? v.getModele() : "Autre",
                        Collectors.counting()
                ));
        stats.put("vehiculeParModele", parModele);

        // Capacité totale de places
        int totalPlaces = vehicules.stream()
                .mapToInt(v -> v.getNbr_place() != null ? v.getNbr_place() : 0)
                .sum();
        stats.put("totalPlaces", totalPlaces);

        // ============ RÉSERVATIONS ============

        // Nombre total de réservations
        stats.put("totalReservations", reservationRepository.count());

        // Réservations par véhicule (id_veh → nombre)
        // Permet de trouver le véhicule le plus utilisé
        Map<Long, Long> resParVehicule = new HashMap<>();
        reservationRepository.findAll().forEach(r -> {
            if (r.getId_veh() != null) {
                resParVehicule.merge(r.getId_veh(), 1L, Long::sum);
            }
        });

        // Véhicule le plus utilisé
        if (!resParVehicule.isEmpty()) {
            Long idVehMax = Collections.max(
                    resParVehicule.entrySet(),
                    Map.Entry.comparingByValue()
            ).getKey();

            // Trouve le véhicule correspondant
            vehiculeRepository.findById(idVehMax).ifPresent(v -> {
                Map<String, Object> vehInfo = new HashMap<>();
                vehInfo.put("id",       v.getId_vehicule());
                vehInfo.put("label",    v.getMarque() + " " + v.getModele());
                vehInfo.put("matricule",v.getMatricule());
                vehInfo.put("count",    resParVehicule.get(idVehMax));
                stats.put("vehiculePlusUtilise", vehInfo);
            });
        }

        // ============ CHAUFFEUR LE PLUS ACTIF ============
        // Chauffeur lié au véhicule le plus utilisé
        if (!resParVehicule.isEmpty()) {
            Long idVehMax = Collections.max(
                    resParVehicule.entrySet(),
                    Map.Entry.comparingByValue()
            ).getKey();

            vehiculeRepository.findById(idVehMax).ifPresent(v -> {
                if (v.getChauffeur() != null) {
                    Map<String, Object> chaufInfo = new HashMap<>();
                    chaufInfo.put("nom",   v.getChauffeur().getNom());
                    chaufInfo.put("tel",   v.getChauffeur().getTel());
                    chaufInfo.put("genre", v.getChauffeur().getGenre());
                    stats.put("chauffeurPlusActif", chaufInfo);
                }
            });
        }

        return stats;
    }
}