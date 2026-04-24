import axios from "axios";
 
const API = "http://localhost:8080/api/vehicules";
 
export const getVehicules   = ()         => axios.get(API);
export const addVehicule    = (data)     => axios.post(API, data);
export const updateVehicule = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteVehicule = (id)       => axios.delete(`${API}/${id}`);