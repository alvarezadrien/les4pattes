// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // ✅ Injecte les infos nécessaires pour les middlewares suivants
        req.user = {
            id: user._id,
            role: user.role,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            avatar: user.avatar
        };

        next();
    } catch (err) {
        console.error('Erreur JWT :', err.message);
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authMiddleware;
