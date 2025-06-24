import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assure-toi que ce chemin est correct

const AdminRoute = () => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return <div>Chargement de l'authentification...</div>; // Ou un spinner visuel
    }

    // ✅ Si l'utilisateur est admin, on affiche les routes enfants
    // ❌ Sinon, on le redirige (ici vers /Connexion)
    return user && isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/Connexion" replace />
        // Tu peux aussi faire : <Navigate to="/unauthorized" replace />
    );
};

export default AdminRoute;
