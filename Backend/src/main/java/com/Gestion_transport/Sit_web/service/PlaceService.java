package com.Gestion_transport.Sit_web.service;

import com.Gestion_transport.Sit_web.entity.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import  com.Gestion_transport.Sit_web.repository.PlaceRepository;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    // ENREGISTRER UNE PLACE
    public Place savePlace(Place p){

        Place place = placeRepository.save(p);

        return place;
    }

    // RECUPERER TOUTES LES PLACES
    public List<Place> getAllPlaces(){

        return placeRepository.findAll();
    }

    // RECUPERER UNE PLACE PAR ID
    public Place getPlaceById(Long id){

        return placeRepository.findById(id).orElse(null);
    }

    // MODIFIER UNE PLACE
    public Place updatePlace(Long id, Place nouvellePlace){

        Place existante = placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place non trouvée"));

        existante.setNumero_place(nouvellePlace.getNumero_place());

        return placeRepository.save(existante);
    }

    // SUPPRIMER UNE PLACE
    public void deletePlace(Long id){

        placeRepository.deleteById(id);
    }

}