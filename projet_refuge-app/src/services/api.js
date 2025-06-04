// src/services/api.js
import axios from 'axios';

// Configure l'instance Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Assure-toi que cette URL correspond à l'adresse de ton backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur de requête : ajoute le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupère le token du localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ajoute le token à l'en-tête Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponse : gère les erreurs de réponse
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Exemple de gestion d'erreur : si le token est invalide (401), déconnecte l'utilisateur
        if (error.response && error.response.status === 401) {
            console.error('Token invalide ou expiré. Déconnexion...');
            localStorage.removeItem('token');
            // Optionnel: rediriger l'utilisateur vers la page de connexion
            // window.location.href = '/connexion';
        }
        return Promise.reject(error);
    }
);

export default api;