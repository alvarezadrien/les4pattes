// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // <<< C'EST ÇA QU'IL FAUT ! PAS DE '/api' ICI !
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

// Optionnel: Intercepteur pour gérer les erreurs 401 globalement
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optionnel: Rediriger vers la page de connexion ou déconnecter l'utilisateur
            // console.log("Token invalide ou expiré. Déconnexion automatique.");
            // localStorage.removeItem('token');
            // window.location.href = '/connexion'; // Redirige vers la page de connexion
        }
        return Promise.reject(error);
    }
);

export default api;