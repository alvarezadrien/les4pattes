// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // api utilise process.env.REACT_APP_API_URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await api.get('/auth/profile');
                    setUser(response.data);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Erreur lors du chargement du profil utilisateur:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        loadUserFromToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token: receivedToken, user: userData } = response.data;
            localStorage.setItem('token', receivedToken);
            setToken(receivedToken);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Échec de la connexion:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Erreur de connexion' };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.post('/auth/signup', userData);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Échec de l\'inscription:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Erreur d\'inscription' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateAvatar = (newAvatarUrl) => {
        setUser(prevUser => ({
            ...prevUser,
            avatarUrl: newAvatarUrl
        }));
    };

    const authContextValue = {
        user,
        token,
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
