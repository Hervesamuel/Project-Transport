// services/statistiqueService.js
// Appels API Spring Boot pour les statistiques

import axios from "axios";

const API =  "https://project-transport.onrender.com/api/statistiques";

// Récupère toutes les statistiques en un seul appel
export const getStatistiques = () => axios.get(API);