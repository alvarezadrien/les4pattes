// middleware/isAdmin.js
module.exports = function (req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Non autorisé. Utilisateur non connecté." });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas administrateur." });
    }

    next();
};
