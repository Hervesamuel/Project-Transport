package com.Gestion_transport.Sit_web.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // composant Spring chargé d'envoyer les emails
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // envoyer un email
    public void envoyerEmail(
            String destinataire,
            String sujet,
            String contenu
    ) {

        System.out.println("========== EMAIL ==========");
        System.out.println("Destinataire : " + destinataire);
        System.out.println("Sujet : " + sujet);
        System.out.println("Message : " + contenu);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(destinataire);
        message.setSubject(sujet);
        message.setText(contenu);

        mailSender.send(message);

        System.out.println("EMAIL ENVOYE !");
    }
}