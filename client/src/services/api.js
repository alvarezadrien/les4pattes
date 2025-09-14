// src/services/api.js
import axios from 'axios';

// URL de production uniquement (aucun fallback en local)
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Intercepteur pour ajouter automatiquement le token à chaque requête sortante
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur global pour gérer les erreurs (ex: 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Erreur 401 : accès non autorisé');
        }
        return Promise.reject(error);
    }
);

export default api;
