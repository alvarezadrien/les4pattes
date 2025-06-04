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
                try {
                    const response = await api.get('/auth/profile');
                    // *** VÉRIFIE ICI : Assure-toi que response.data inclut avatarUrl ***
                    // Exemple: response.data pourrait ressembler à { id: '...', email: '...', avatarUrl: '...' }
                    setUser(response.data);
                } catch (error) {
                    console.error('Erreur lors du chargement du profil utilisateur:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        loadUserFromToken();
    }, []);

    // Fonction de connexion
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user: userData } = response.data;
            // *** VÉRIFIE ICI : Assure-toi que userData contient avatarUrl ***
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Échec de la connexion:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Erreur de connexion' };
        }
    };

    // ... (le reste de ton AuthContext.js reste inchangé) ...

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
    // Cette fonction est utilisée par Mon_compte par exemple, si tu y gères l'upload d'avatar
    const updateAvatar = (newAvatarUrl) => {
        setUser(prevUser => ({
            ...prevUser,
            avatarUrl: newAvatarUrl
        }));
    };

    const authContextValue = {
        user,
        loading,
        login,
        signup,
        logout,
        updateAvatar,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};