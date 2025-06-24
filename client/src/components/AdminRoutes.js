// components/AdminRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return <div>Chargement de l'authentification...</div>;
    }

    return user && isAdmin ? children : <Navigate to="/Connexion" replace />;
};

export default AdminRoute;
