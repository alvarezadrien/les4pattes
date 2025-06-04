// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // <<< NOUVEL IMPORT : Assurez-vous que le chemin est correct vers votre modèle User
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'; // Assurez-vous que JWT_SECRET est défini dans vos variables d'environnement

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header reçu:', authHeader); // Pour le débogage

    if (!authHeader) {
        console.log('Token manquant: Pas d\'Auth Header'); // Pour le débogage
        return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    console.log('Token extrait:', token); // Pour le débogage

    if (!token) {
        console.log('Token manquant après split: Auth Header mal formé'); // Pour le débogage
        return res.status(401).json({ message: 'Token mal formé' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token décodé:', decoded); // Pour le débogage

        // Récupérer l'utilisateur pour obtenir son nom d'utilisateur et éventuellement son rôle
        const user = await User.findById(decoded.userId).select('prenom nom role'); // J'ajoute 'role' ici si vous voulez l'utiliser plus tard
        if (!user) {
            console.log('Utilisateur non trouvé pour ID:', decoded.userId); // Pour le débogage
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Ajouter l'ID, le nom d'utilisateur (prénom + nom) et le rôle (si présent) à l'objet req.user
        req.user = {
            id: decoded.userId,
            username: `${user.prenom} ${user.nom}`, // Concaténation pour le nom complet
            role: user.role // Ajoutez le rôle si votre modèle User a un champ 'role'
        };
        console.log('Utilisateur authentifié:', req.user); // Pour le débogage

        next();
    } catch (err) {
        console.error('Erreur de vérification du token:', err.message); // Affiche l'erreur spécifique du JWT (ex: "jwt expired")
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authMiddleware;