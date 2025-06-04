// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // <<< NOUVEL IMPORT : Assurez-vous que le chemin est correct vers votre modèle User
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const authMiddleware = async (req, res, next) => { // <<< AJOUT ASYNC
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Récupérer l'utilisateur pour obtenir son nom d'utilisateur
        const user = await User.findById(decoded.userId).select('prenom nom'); // <<< NOUVEAU
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Ajouter l'ID et le nom d'utilisateur (prénom + nom) à l'objet req.user
        req.user = {
            id: decoded.userId,
            username: `${user.prenom} ${user.nom}` // <<< MODIFICATION ICI : Concaténation pour le nom complet
        };

        next();
    } catch (err) {
        console.error(err); // Utile pour le débogage
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authMiddleware;