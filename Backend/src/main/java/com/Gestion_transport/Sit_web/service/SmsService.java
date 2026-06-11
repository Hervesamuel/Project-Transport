package com.Gestion_transport.Sit_web.service;

// ---- Imports nécessaires ----
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class SmsService {

    // ---- Récupère les valeurs depuis application.properties ----
    @Value("${orange.client-id}")
    private String clientId;

    @Value("${orange.client-secret}")
    private String clientSecret;

    @Value("${orange.api.url}")
    private String apiUrl;

    @Value("${orange.token.url}")
    private String tokenUrl;

    // RestTemplate = outil pour faire des appels HTTP vers Orange API
    private final RestTemplate restTemplate = new RestTemplate();

    // ============================================
    // ÉTAPE 1 — Récupérer le Token OAuth Orange
    // Orange exige un token avant chaque envoi SMS
    // ============================================
    private String getToken() {

        // 1. Encode Client ID + Secret en Base64
        // Format : "clientId:clientSecret" encodé en Base64
        String credentials = clientId + ":" + clientSecret;
        String encoded = Base64.getEncoder().encodeToString(credentials.getBytes());

        // 2. Prépare les headers de la requête
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + encoded);

        // 3. Prépare le corps de la requête
        // grant_type=client_credentials = authentification par clé API
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        // 4. Envoie la requête à Orange pour obtenir le token
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    tokenUrl,
                    request,
                    Map.class
            );

            // 5. Extrait le token de la réponse
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return (String) response.getBody().get("access_token");
            }

        } catch (Exception e) {
            System.err.println("Erreur récupération token Orange : " + e.getMessage());
        }

        return null; // null = échec
    }

    // ============================================
    // ÉTAPE 2 — Envoyer le SMS via Orange API
    // ============================================
    public boolean envoyerSms(String numeroDestinataire, String message) {

        // 1. Récupère le token OAuth
        String token = getToken();

        if (token == null) {
            System.err.println("Token Orange introuvable — SMS non envoyé !");
            return false;
        }

        // 2. Prépare les headers avec le token
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);

        // 3. Formate le numéro en format international
        // Madagascar : 0341234567 → +2613441234567
        String numeroFormate = formaterNumero(numeroDestinataire);

        // 4. Prépare le corps du SMS
        // Format JSON exigé par Orange API
        Map<String, Object> outboundSMS = new HashMap<>();
        outboundSMS.put("senderAddress", "tel:+261" + clientId.substring(0, 8));
        outboundSMS.put("address", "tel:" + numeroFormate);

        Map<String, Object> smsText = new HashMap<>();
        smsText.put("message", message);
        outboundSMS.put("outboundSMSTextMessage", smsText);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("outboundSMSMessageRequest", outboundSMS);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // 5. Envoie le SMS via Orange API
        try {
            String url = apiUrl + "/outbound/tel%3A%2B261" + clientId.substring(0, 8) + "/requests";

            System.out.println("===== SMS DEBUG =====");

            System.out.println("URL : " + url);

            System.out.println("Numero : " + numeroFormate);

            System.out.println("Token obtenu : " + (token != null));

            System.out.println("Client ID : " + clientId);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    request,
                    String.class
            );

            // 6. Vérifie si l'envoi a réussi (201 = Created = succès)
            if (response.getStatusCode() == HttpStatus.CREATED) {
                System.out.println("SMS envoyé avec succès à : " + numeroFormate);
                return true;
            }

        } catch (Exception e) {
            System.err.println("Erreur envoi SMS : " + e.getMessage());
        }

        return false;
    }

    // ============================================
    // UTILITAIRE — Formate le numéro en +261XXXXXXXXX
    // ============================================
    private String formaterNumero(String numero) {

        // Supprime les espaces
        numero = numero.trim().replaceAll("\\s+", "");

        // Déjà au bon format
        if (numero.startsWith("+261")) {
            return numero;
        }

        // Format local : 0341234567 → +261341234567
        if (numero.startsWith("0")) {
            return "+261" + numero.substring(1);
        }

        // Déjà sans 0 : 341234567 → +261341234567
        return "+261" + numero;
    }
}