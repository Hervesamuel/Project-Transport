// services/reservationServices.js
// Appels API Spring Boot pour les réservations

import axios from "axios";

const API = "http://localhost:8080/api/reservations";

export const getReservations   = ()         => axios.get(API);
export const addReservation    = (data)     => axios.post(API, data);
export const updateReservation = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteReservation = (id)       => axios.delete(`${API}/${id}`);