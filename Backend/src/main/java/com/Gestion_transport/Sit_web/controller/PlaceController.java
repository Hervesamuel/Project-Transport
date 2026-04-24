package com.Gestion_transport.Sit_web.controller;


import com.Gestion_transport.Sit_web.entity.Place;
import com.Gestion_transport.Sit_web.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/places")
public class PlaceController {


    @Autowired
    private PlaceRepository placeRepository;

    // ===============================
    // Lister toutes les places
    // ===============================
    @GetMapping
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    // ===============================
    // Ajouter une place
    // ===============================
    @PostMapping
    public Place addPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    // ===============================
    // Chercher une place par ID
    // ===============================
    @GetMapping("/{id}")
    public Place getPlaceById(@PathVariable Long id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place non trouvée"));
    }

    // ===============================
    // Modifier une place
    // ===============================
    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Long id, @RequestBody Place placeDetails) {

        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place non trouvée"));

        place.setNumero_place(placeDetails.getNumero_place());

        return placeRepository.save(place);
    }

    // ===============================
    // Supprimer une place
    // ===============================
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        placeRepository.deleteById(id);
    }

}
