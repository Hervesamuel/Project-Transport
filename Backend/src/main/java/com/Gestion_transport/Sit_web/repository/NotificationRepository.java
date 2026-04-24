package com.Gestion_transport.Sit_web.repository;

import com.Gestion_transport.Sit_web.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
    long countByLuFalse();
}