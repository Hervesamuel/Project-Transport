// services/chauffeurServices.js
// Appels API Spring Boot pour les chauffeurs

import axios from "axios";

const API = "https://project-transport.onrender.com/api/chauffeurs";

export const getChauffeurs    = ()         => axios.get(API);
export const addChauffeur     = (data)     => axios.post(API, data);
export const updateChauffeur  = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteChauffeur  = (id)       => axios.delete(`${API}/${id}`);