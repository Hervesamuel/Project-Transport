import axios from "axios";

// URL API backend
const API_URL = "https://project-transport.onrender.com/api/notifications";

// récupérer toutes les notifications
export const getNotifications = () => {
  return axios.get(API_URL);
};

// récupérer le nombre de notifications
export const getNotificationCount = () => {
  return axios.get(API_URL + "/count");
};

export const markNotificationsAsRead = () => {
  return axios.put("http://localhost:8080/api/notifications/read");
};