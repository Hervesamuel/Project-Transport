package com.Gestion_transport.Sit_web.controller;

import com.Gestion_transport.Sit_web.entity.Vehicule;
import com.Gestion_transport.Sit_web.service.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Autorisation du frontend Vite/React se connecter au Port
@RestController
@RequestMapping("/api/vehicules")

public class VehiculeController {

    @Autowired
    private VehiculeService vehiculeService;

    @GetMapping
    public List<Vehicule> getAllVehicules(){
        return vehiculeService.getAllVehicules();
    }

    @PostMapping
    public Vehicule saveVehicule(@RequestBody Vehicule v){
        return vehiculeService.saveVehicule(v);
    }

    @PutMapping("/{id}")
    public Vehicule updateVehicule(@PathVariable Long id, @RequestBody Vehicule v) {
        // On doit passer l'ID ET le nouveau corps (v) au service
        return vehiculeService.updateVehicule(id, v);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicule(@PathVariable Long id){
        vehiculeService.deleteVehicule(id);
    }

}
