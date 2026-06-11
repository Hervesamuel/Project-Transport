package com.Gestion_transport.Sit_web.service;
import com.Gestion_transport.Sit_web.entity.Notification;
import com.Gestion_transport.Sit_web.repository.NotificationRepository;
import com.Gestion_transport.Sit_web.entity.Reservation;
import com.Gestion_transport.Sit_web.service.SmsService;
import com.Gestion_transport.Sit_web.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class NotificationService {

    private final NotificationRepository notificationRepository;
    // accès aux réservations
    private final ReservationRepository reservationRepository;

    // service d'envoi email
    private final EmailService emailService;

    // service d'envoi SMS
    private final SmsService smsService;

    // Injection par constructeur (meilleure pratique Spring)
    public NotificationService(
            NotificationRepository notificationRepository,
            ReservationRepository reservationRepository,
            EmailService emailService,
            SmsService smsService
    ) {

        this.notificationRepository = notificationRepository;
        this.reservationRepository = reservationRepository;
        this.emailService = emailService;
        this.smsService = smsService;

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
    // notification envoyée aux voyageurs sélectionnés
    public void sendNotificationToReservations(
            List<Long> reservationIds,
            String message
    ){

        Notification notification = new Notification();

        notification.setMessage(
                "📩 Notification envoyée à "
                        + reservationIds.size()
                        + " voyageur(s) : "
                        + message
        );

        notification.setDate(LocalDateTime.now());

        notification.setLu(false);

        notificationRepository.save(notification);

    }

    // envoyer notification + email
    public void envoyerNotificationAuxVoyageurs(
            List<Long> reservationIds,
            String message
    ) {

        System.out.println("===== EMAIL =====");

        System.out.println("IDs reçus : "
                + reservationIds);

        // récupérer les réservations cochées
        List<Reservation> voyageurs =
                reservationRepository.findAllById(
                        reservationIds
                );

        System.out.println(
                "Nombre voyageurs : "
                        + voyageurs.size()
        );

        // envoyer email à chaque voyageur
        for(Reservation r : voyageurs){

            System.out.println(
                    "Email trouvé : "
                            + r.getEmail()
            );

            emailService.envoyerEmail(

                    r.getEmail(),

                    "Notification Nexa Transport",

                    message

            );

            // envoi SMS
            smsService.envoyerSms(
                    r.getTel(),
                    message
            );
        }

        // sauvegarde dans la table notification
        createNotification(message);

    }



}
