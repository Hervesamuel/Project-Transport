package com.Gestion_transport.Sit_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Gestion_transport.Sit_web.entity.Chauffeur;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long>{



}
