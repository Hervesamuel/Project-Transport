package com.Gestion_transport.Sit_web.controller;
import com.Gestion_transport.Sit_web.entity.Notification;
import com.Gestion_transport.Sit_web.service.NotificationService;
import com.Gestion_transport.Sit_web.dto.NotificationRequest;


import com.Gestion_transport.Sit_web.service.SmsService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173") // autoriser React
public class NotificationController {



    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // récupérer toutes les notifications
    @GetMapping
    public List<Notification> getNotifications(){
        return notificationService.getAllNotifications();
    }

    // récupérer le nombre de notifications
    @GetMapping("/count")
    public long countNotifications(){
        return notificationService.countNotifications();
    }

    // marquer toutes les notifications comme lues
    @PutMapping("/read")
    public void markAsRead(){
        notificationService.markAllAsRead();
    }

    @PostMapping("/send")
    public void sendNotification(
            @RequestBody NotificationRequest request
    ){

        notificationService.envoyerNotificationAuxVoyageurs(
                request.getReservationIds(),
                request.getMessage()

        );


    }

}

