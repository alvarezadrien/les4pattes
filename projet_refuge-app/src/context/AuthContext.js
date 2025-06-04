// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Importe ton instance Axios configurée

// Crée le Contexte d'authentification
const AuthContext = createContext();

// Crée le fournisseur (Provider) de Contexte d'authentification
export const AuthProvider = ({ children }) => {
    // État pour stocker l'utilisateur (null si déconnecté)
    const [user, setUser] = useState(null);
    // État pour indiquer si le chargement initial est terminé (par exemple, pour vérifier le token au démarrage)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fonction exécutée une seule fois au montage du composant
        const loadUserFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // Si un token existe, on tente de récupérer le profil de l'utilisateur
                try {
                    // Axios est déjà configuré dans 'api.js' pour ajouter le token automatiquement
                    const response = await api.get('/auth/profile');
                    // Assure-toi que la réponse contient les bonnes données utilisateur
                    setUser(response.data);
                } catch (error) {
                    console.error('Erreur lors du chargement du profil utilisateur:', error);
                    localStorage.removeItem('token'); // Token invalide ou expiré, on le supprime
                    setUser(null);
                }
            }
            setLoading(false); // Le chargement initial est terminé
        };

        loadUserFromToken();
    }, []); // Le tableau vide assure que cela ne s'exécute qu'une seule fois

    // Fonction de connexion
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user: userData } = response.data; // Récupère le token et les données user
            localStorage.setItem('token', token); // Stocke le token
            setUser(userData); // Met à jour l'état de l'utilisateur
            return { success: true };
        } catch (error) {
            console.error('Échec de la connexion:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Erreur de connexion' };
        }
    };

    // Fonction d'inscription
    const signup = async (userData) => {
        try {
            const response = await api.post('/auth/signup', userData);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Échec de l\'inscription:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Erreur d\'inscription' };
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem('token'); // Supprime le token
        setUser(null); // Réinitialise l'état de l'utilisateur
    };

    // La fonction pour mettre à jour l'avatar côté frontend après un upload réussi
    const updateAvatar = (newAvatarUrl) => {
        setUser(prevUser => ({
            ...prevUser,
            avatarUrl: newAvatarUrl
        }));
    };

    // La valeur qui sera fournie à tous les composants qui utilisent ce contexte
    const authContextValue = {
        user,
        loading,
        login,
        signup,
        logout,
        updateAvatar, // Ajoute cette fonction pour mettre à jour l'avatar
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children} {/* Affiche les enfants seulement après le chargement initial */}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte d'authentification facilement
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};