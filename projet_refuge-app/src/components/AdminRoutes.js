// src/components/AdminRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct based on your project structure

const AdminRoute = () => {
    const { user, loading, isAdmin } = useAuth(); // Get user, loading state, and isAdmin property from your AuthContext

    // While authentication state is loading, you might want to display a loading indicator.
    // This prevents flickering or premature redirection.
    if (loading) {
        return <div>Chargement de l'authentification...</div>; // You can replace this with a spinner or a more sophisticated loader component
    }

    // If the user is logged in (user is not null) AND they have the 'admin' role,
    // render the child routes (the actual admin pages).
    // Otherwise, redirect them to the login page (or an unauthorized page).
    return user && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
    // You could also redirect to a custom unauthorized page like '/unauthorized' instead of '/login'
};

export default AdminRoute;