package com.Gestion_transport.Sit_web.controller;

// ---- Imports des repositories ----
// Correspondent exactement aux fichiers dans ton dossier repository/
import com.Gestion_transport.Sit_web.repository.ChauffeurRepository;
import com.Gestion_transport.Sit_web.repository.ReservationRepository;
import com.Gestion_transport.Sit_web.repository.VehiculeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;// HashMap = implémentation concrète de Map
import java.util.Map;

// ✅ Autorise React (port 5173) à accéder à ce controller
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    // ---- Injection des repositories ----
    @Autowired
    private VehiculeRepository vehiculeRepository;       // ✅ VehiculeRepository

    @Autowired
    private ChauffeurRepository chauffeurRepository;     // ✅ ChauffeurRepository

    @Autowired
    private ReservationRepository reservationRepository; // ✅ ReservationRepository

    // ---- GET /api/dashboard/stats ----
    // Retourne le nombre total de chaque entité dans la BD
    // Résultat JSON : { "vehicules": 3, "chauffeurs": 4, "reservations": 0 }
    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        // Map = objet clé/valeur → converti en JSON automatiquement
        Map<String, Long> stats = new HashMap<>();

        // count() = compte le nombre total de lignes dans chaque table
        stats.put("vehicules",    vehiculeRepository.count());
        stats.put("chauffeurs",   chauffeurRepository.count());
        stats.put("reservations", reservationRepository.count());

        return stats;
    }
}