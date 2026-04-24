package com.Gestion_transport.Sit_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Gestion_transport.Sit_web.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
}
