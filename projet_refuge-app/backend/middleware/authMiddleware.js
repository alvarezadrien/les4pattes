// middleware/auth.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.userId }; // <-- MODIFICATION ICI : Créer un objet 'user' avec 'id'
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;