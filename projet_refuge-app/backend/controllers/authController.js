const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { nom, prenom, dateNaissance, adresse, telephone, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

        // avatar par défaut ajouté
        const newUser = new User({
            nom,
            prenom,
            dateNaissance,
            adresse,
            telephone,
            email,
            password,
            avatar: '/img/avatar.png' // <- avatar par défaut
        });

        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

        // renvoyer toutes les données utiles du user
        res.status(200).json({
            message: 'Connexion réussie.',
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                dateNaissance: user.dateNaissance,
                adresse: user.adresse,
                telephone: user.telephone,
                avatar: user.avatar
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
};
