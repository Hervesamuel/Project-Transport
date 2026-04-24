package com.Gestion_transport.Sit_web.service;

import com.Gestion_transport.Sit_web.entity.Reservation;
import com.Gestion_transport.Sit_web.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.Gestion_transport.Sit_web.entity.Reservation;

@Service
public class ReservationService {

    @Autowired // Injection automatique du repository
    private ReservationRepository reservationRepository;

    // AJOUTER DE RESERVATION DANS LA BD
    public Reservation saveReservation(Reservation r){
        return reservationRepository.save(r);
    }

    //RECUPERER TOUS LES RESERVATIONS
    public List<Reservation> getAllReservation(){
        return reservationRepository.findAll();
    }
    // RECUPERER UNE RESERVATION PAR ID
    public Reservation getReservationById(Long id){
        return reservationRepository.findById(id).orElse(null);
    }

    // SUPPRIMER UNE RESERVATION
    public void deleteReservation(Long id){
        reservationRepository.deleteById(id);
    }

}
