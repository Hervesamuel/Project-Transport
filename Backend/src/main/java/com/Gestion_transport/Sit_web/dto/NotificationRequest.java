package com.Gestion_transport.Sit_web.dto;

import java.util.List;

public class NotificationRequest {

    private List<Long> reservationIds;

    private String message;

    public List<Long> getReservationIds() {
        return reservationIds;
    }

    public void setReservationIds(List<Long> reservationIds) {
        this.reservationIds = reservationIds;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}