package com.Gestion_transport.Sit_web.service;

import com.Gestion_transport.Sit_web.repository.ChauffeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.Gestion_transport.Sit_web.entity.Chauffeur;

@Service // indique que cette classe contient la logique métier
public class ChauffeurService {

    @Autowired // Injection automatique du repository
    private ChauffeurRepository chauffeurRepository;

    // ENREGISTREMENT DE CHAUFFEUR DANS LA BD
    public Chauffeur saveChauffeur(Chauffeur c){
        return chauffeurRepository.save(c);
    }

    //RECUPERER UN CHAUFFEUR ID
    public Chauffeur getChauffeurById(Long id){
        return chauffeurRepository.findById(id).orElse(null);
    }

    //RECUPERER TOUS LES CHAUFFEURS
    public List<Chauffeur> getAllChauffeurs(){
        return chauffeurRepository.findAll();
    }
    // MODIFICATION DE CHAUFFEUR(MIS à JOUR)
    public Chauffeur updateChauffeur(Long id, Chauffeur nouveauChauffeur){
        Chauffeur existing = chauffeurRepository.findById(id).orElse(null);

        if(existing == null){
            return null;
        }

        // mise à jour des champs
        existing.setNom(nouveauChauffeur.getNom());
        existing.setEmail(nouveauChauffeur.getEmail());
        existing.setGenre(nouveauChauffeur.getGenre());
        existing.setTel(nouveauChauffeur.getTel());

        return chauffeurRepository.save(existing);
    }

    //SUPPRESSION DE CHAUFFEUR
    public void deleteChauffeur(Long id){
        chauffeurRepository.deleteById(id);
    }
}
