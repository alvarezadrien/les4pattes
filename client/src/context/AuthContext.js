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
                    const response = await api.get('/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });

                    const fetchedUser = response.data;

                    // 🔐 On s'assure que l'ID est bien une string
                    if (fetchedUser._id && typeof fetchedUser._id !== 'string') {
                        fetchedUser._id = fetchedUser._id.toString();
                    }

                    setUser(fetchedUser);
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
            const response = await api.post('/api/auth/login', { email, password });
            const { token: receivedToken, user: userData } = response.data;

            // 🔐 ID en string
            if (userData._id && typeof userData._id !== 'string') {
                userData._id = userData._id.toString();
            }

            localStorage.setItem('token', receivedToken);
            setToken(receivedToken);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Échec de la connexion:', error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || 'Erreur de connexion'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.post('/api/auth/signup', userData);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Échec de l'inscription:", error.response?.data?.message || error.message);
            return {
                success: false,
                message: error.response?.data?.message || "Erreur d'inscription"
            };
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
            avatar: newAvatarUrl
        }));
    };

    const updateUserData = (updatedUser) => {
        setUser(prev => ({
            ...prev,
            ...updatedUser
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
        updateUserData,
        isAdmin: user?.role === 'admin'
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

export default AuthContext;
