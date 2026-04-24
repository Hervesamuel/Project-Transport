package com.Gestion_transport.Sit_web.controller;

import com.Gestion_transport.Sit_web.entity.Chauffeur;
import com.Gestion_transport.Sit_web.service.ChauffeurService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chauffeurs")
@CrossOrigin(origins = "http://localhost:5173")
public class ChauffeurController {

    @Autowired
    private ChauffeurService chauffeurService;

    // AJOUTER UN CHAUFFEUR
    @PostMapping
    public Chauffeur saveChauffeur(@RequestBody Chauffeur c){
        return chauffeurService.saveChauffeur(c);
    }

    // RECUPERER Tous CHAUFFEUR PAR ID
    @GetMapping
    public List<Chauffeur> getAllChauffeurs(){
        return chauffeurService.getAllChauffeurs();
    }

    // RECUPERER UN CHAUFFEUR PAR ID
    @GetMapping("/{id}")
    public Chauffeur getChauffeurById(@PathVariable Long id){
        return chauffeurService.getChauffeurById(id);
    }

    @PutMapping("/{id}")
    public Chauffeur updateChauffeur(@PathVariable Long id, @RequestBody Chauffeur c){
        return chauffeurService.updateChauffeur(id, c);
    }

    // SUPPRIMER UN CHAUFFEUR
    @DeleteMapping("/{id}")
    public void deleteChauffeur(@PathVariable Long id){
        chauffeurService.deleteChauffeur(id);
    }

}
