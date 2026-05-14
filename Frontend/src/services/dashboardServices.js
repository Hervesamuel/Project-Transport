// services/dashboardService.js
// Appels API Spring Boot pour le Dashboard
// URL: http://localhost:8080/api/dashboard

import axios from "axios";

const API = "http://localhost:8080/api/dashboard";

// Récupère les stats : nombre de véhicules, chauffeurs, réservations
export const getStats = () => axios.get(`${API}/stats`);