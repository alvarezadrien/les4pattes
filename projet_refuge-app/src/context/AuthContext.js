// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Importe ton instance Axios configurée

// Crée le Contexte d'authentification
const AuthContext = createContext();

// Crée le fournisseur (Provider) de Contexte d'authentification
export const AuthProvider = ({ children }) => {
    // État pour stocker l'utilisateur (null si déconnecté)
    const [user, setUser] = useState(null);
    // État pour stocker le token. Initialisé à partir du localStorage.
    const [token, setToken] = useState(localStorage.getItem('token') || null); // <<< AJOUT DU TOKEN DANS L'ÉTAT
    // État pour indiquer si le chargement initial est terminé (par exemple, pour vérifier le token au démarrage)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromToken = async () => {
            // Le token est déjà dans l'état 'token', mais on peut aussi le re-vérifier avec localStorage
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                // Axios est déjà configuré dans 'api.js' pour ajouter le token automatiquement
                // Donc pas besoin de le passer manuellement ici si l'intercepteur est en place.
                try {
                    const response = await api.get('/auth/profile');
                    setUser(response.data);
                    setToken(storedToken); // Assure que le state 'token' est synchronisé
                } catch (error) {
                    console.error('Erreur lors du chargement du profil utilisateur:', error);
                    localStorage.removeItem('token'); // Token invalide ou expiré, on le supprime
                    setToken(null); // Réinitialise le token dans l'état
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
            const { token: receivedToken, user: userData } = response.data; // Récupère le token et les données user
            localStorage.setItem('token', receivedToken); // Stocke le token dans localStorage
            setToken(receivedToken); // Met à jour l'état du token
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
        localStorage.removeItem('token'); // Supprime le token du localStorage
        setToken(null); // Réinitialise l'état du token
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
        token, // <<< EXPOSE LE TOKEN ICI !
        loading,
        login,
        signup,
        logout,
        updateAvatar,
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