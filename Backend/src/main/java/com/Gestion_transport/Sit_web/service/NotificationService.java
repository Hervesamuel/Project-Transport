package com.Gestion_transport.Sit_web.service;
import com.Gestion_transport.Sit_web.entity.Notification;
import com.Gestion_transport.Sit_web.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    // Injection par constructeur (meilleure pratique Spring)
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // Méthode pour créer une notification
    public void createNotification(String message){

        Notification notification = new Notification();

        // on ajoute le message
        notification.setMessage(message);

        // on met la date actuelle
        notification.setDate(LocalDateTime.now());

        // notification non lue par défaut
        notification.setLu(false);

        // sauvegarde dans la base de données
        notificationRepository.save(notification);

    }

    // récupérer toutes les notifications
    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    // compter les notifications non lues
    public long countNotifications(){
        return notificationRepository.count();
    }

    // marquer toutes les notifications comme lues
    public void markAllAsRead(){

        List<Notification> notifications = notificationRepository.findAll();

        for(Notification n : notifications){
            n.setLu(true);
        }

        notificationRepository.saveAll(notifications);
    }

   // return notificationRepository.countByLuFalse();
}
