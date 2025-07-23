// middleware/isAdmin.js

module.exports = function (req, res, next) {
    // Vérifie que le middleware d'authentification a bien ajouté l'utilisateur à req.user
    if (!req.user) {
        return res.status(401).json({ message: "Non autorisé. Utilisateur non connecté." });
    }

    // Vérifie si l'utilisateur a le rôle 'admin'
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas administrateur." });
    }

    // Si tout est bon, on passe à la suite
    next();
};
