package com.Gestion_transport.Sit_web.controller;


import com.Gestion_transport.Sit_web.entity.Reservation;
import com.Gestion_transport.Sit_web.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations(){
        return reservationService.getAllReservation();
    }


    @PostMapping
    public Reservation saveReservation(@RequestBody Reservation r){
        return reservationService.saveReservation(r);
    }


    @PutMapping("/{id}")
    public Reservation getReservationById(@PathVariable Long id){
        return reservationService.getReservationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id){
        reservationService.deleteReservation(id);
    }
}

