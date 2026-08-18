// services/dashboardService.js
// Appels API Spring Boot pour le Dashboard
// URL: http://localhost:8080/api/dashboard

import axios from "axios";

const API = "https://project-transport.onrender.com/api/dashboard";

// Récupère les stats : nombre de véhicules, chauffeurs, réservations
export const getStats = () => axios.get(`${API}/stats`);