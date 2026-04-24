package com.Gestion_transport.Sit_web.service;

import com.Gestion_transport.Sit_web.entity.Chauffeur;
import com.Gestion_transport.Sit_web.entity.Vehicule;
import com.Gestion_transport.Sit_web.repository.ChauffeurRepository;
import com.Gestion_transport.Sit_web.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehiculeService {

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Autowired
    private ChauffeurRepository chauffeurRepository; // ✅ Pour récupérer l'objet Chauffeur depuis l'ID

    @Autowired
    private NotificationService notificationService;

    // ---- AJOUTER UN VÉHICULE ----
    public Vehicule saveVehicule(Vehicule v) {

        // ✅ Récupérer l'objet Chauffeur complet depuis l'ID reçu
        // Car ManyToOne attend un objet Chauffeur, pas juste un id_chauf !
        if (v.getChauffeur() != null && v.getChauffeur().getId_chauf() != null) {
            Chauffeur chauffeur = chauffeurRepository
                    .findById(v.getChauffeur().getId_chauf())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            v.setChauffeur(chauffeur);
        }

        Vehicule vehicule = vehiculeRepository.save(v);

        // Notification après ajout
        notificationService.createNotification("🚗 Nouveau véhicule ajouté : " + v.getMarque() + " " + v.getModele());

        return vehicule;
    }

    // ---- RÉCUPÉRER TOUS LES VÉHICULES ----
    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }

    // ---- RÉCUPÉRER UN VÉHICULE PAR ID ----
    public Vehicule getVehiculeById(Long id) {
        return vehiculeRepository.findById(id).orElse(null);
    }

    // ---- MODIFIER UN VÉHICULE ----
    public Vehicule updateVehicule(Long id, Vehicule nouveauVehicule) {

        // 1. Chercher le véhicule existant
        Vehicule existant = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé avec l'id : " + id));

        // 2. Mettre à jour les champs simples
        existant.setMarque(nouveauVehicule.getMarque());
        existant.setModele(nouveauVehicule.getModele());
        existant.setMatricule(nouveauVehicule.getMatricule());
        existant.setNbr_place(nouveauVehicule.getNbr_place());

        // 3. ✅ Mettre à jour le chauffeur (ManyToOne)
        // On récupère l'objet Chauffeur complet depuis l'ID envoyé
        if (nouveauVehicule.getChauffeur() != null && nouveauVehicule.getChauffeur().getId_chauf() != null) {
            Chauffeur chauffeur = chauffeurRepository
                    .findById(nouveauVehicule.getChauffeur().getId_chauf())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            existant.setChauffeur(chauffeur);
        }

        // 4. Notification après modification
        notificationService.createNotification("✏️ Véhicule modifié : " + existant.getMarque() + " " + existant.getModele());

        // 5. Sauvegarder et retourner
        return vehiculeRepository.save(existant);
    }

    // ---- SUPPRIMER UN VÉHICULE ----
    public void deleteVehicule(Long id) {
        vehiculeRepository.deleteById(id);

        // Notification après suppression
        notificationService.createNotification("🗑 Véhicule supprimé (ID: " + id + ")");
    }
}