// src/services/api.js
import axios from 'axios';

// Utilise l'URL définie dans .env, sinon celle par défaut en local
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Intercepteur pour ajouter le token à chaque requête sortante
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

// Intercepteur pour gérer les erreurs 401 globalement (optionnel)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optionnel : déconnexion automatique ou redirection
            // localStorage.removeItem('token');
            // window.location.href = '/connexion';
            console.warn('Erreur 401 : accès non autorisé');
        }
        return Promise.reject(error);
    }
);

export default api;
